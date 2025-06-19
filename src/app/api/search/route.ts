/**
 * @fileoverview Train Search API Route
 * 
 * This API endpoint handles train schedule searches between stations on the
 * Circumvesuviana network. It supports flexible station matching (by code or name),
 * time-based filtering, and Campania Express filtering.
 * 
 * Endpoint: GET /api/search
 * 
 * Query Parameters:
 * - from: Source station (code or name)
 * - to: Destination station (code or name)  
 * - date: Travel date (YYYY-MM-DD format, optional)
 * - time: Departure time (HH:MM format, optional)
 * - isCampaniaExpress: Filter for Campania Express only (boolean, optional)
 * 
 * @author VesuviaSearch Team
 * @version 1.0.0
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { TrainSearchSchema } from '@/lib/types';

/**
 * GET handler for train search requests
 * 
 * Processes search queries and returns matching train schedules with full details
 * including stations, stops, and timing information.
 * 
 * @param request - Next.js request object with search parameters
 * @returns Promise<NextResponse> JSON response with search results
 */
export async function GET(request: NextRequest) {
    try {
        // ========================================
        // PARSE AND VALIDATE SEARCH PARAMETERS
        // ========================================

        const { searchParams } = new URL(request.url);
        const searchData = {
            from: searchParams.get('from') || '',
            to: searchParams.get('to') || '',
            date: searchParams.get('date') || undefined,
            time: searchParams.get('time') || undefined,
            isCampaniaExpress: searchParams.get('isCampaniaExpress') === 'true' ? true : undefined,
        };

        // Remove undefined values to avoid Zod validation issues
        const cleanedSearchData = Object.fromEntries(
            Object.entries(searchData).filter(([, value]) => value !== undefined)
        );

        // Validate search parameters using Zod schema
        const validatedSearch = TrainSearchSchema.parse(cleanedSearchData);

        // ========================================
        // FIND MATCHING STATIONS
        // ========================================

        // Search for stations by both code and name to support flexible input
        const [fromStations, toStations] = await Promise.all([
            prisma.station.findMany({
                where: {
                    OR: [
                        { code: { contains: validatedSearch.from } },
                        { name: { contains: validatedSearch.from } }
                    ]
                }
            }),
            prisma.station.findMany({
                where: {
                    OR: [
                        { code: { contains: validatedSearch.to } },
                        { name: { contains: validatedSearch.to } }
                    ]
                }
            })
        ]);

        // Return early if no matching stations found
        if (fromStations.length === 0 || toStations.length === 0) {
            return NextResponse.json({
                trains: [],
                totalResults: 0,
                message: 'Nessuna stazione trovata con i criteri specificati'
            });
        }

        const fromStationIds = fromStations.map(s => s.id);
        const toStationIds = toStations.map(s => s.id);

        // Costruisci il filtro per i treni
        const where: {
            OR?: Array<{
                AND: Array<{
                    startStationId?: { in: number[] };
                    endStationId?: { in: number[] };
                    stops?: {
                        some: {
                            stationId: { in: number[] };
                        };
                    };
                }>;
            }>;
            isCampaniaExpress?: boolean;
            departureTime?: { gte: string };
        } = {
            OR: [
                // Treni diretti
                {
                    AND: [
                        { startStationId: { in: fromStationIds } },
                        { endStationId: { in: toStationIds } }
                    ]
                },
                // Treni con fermate intermedie
                {
                    AND: [
                        {
                            stops: {
                                some: {
                                    stationId: { in: fromStationIds }
                                }
                            }
                        },
                        {
                            stops: {
                                some: {
                                    stationId: { in: toStationIds }
                                }
                            }
                        }
                    ]
                }
            ]
        };

        // Aggiungi filtro per Campania Express se specificato
        if (validatedSearch.isCampaniaExpress !== undefined) {
            where.isCampaniaExpress = validatedSearch.isCampaniaExpress;
        }

        // NON aggiungiamo il filtro per orario qui, lo faremo dopo nel filtraggio
        // perché per i treni che fermano alla stazione dobbiamo controllare l'orario della fermata

        const trains = await prisma.train.findMany({
            where,
            include: {
                startStation: true,
                endStation: true,
                stops: {
                    include: {
                        station: true
                    },
                    orderBy: { stopOrder: 'asc' }
                }
            },
            orderBy: [
                { departureTime: 'asc' },
                { trainNumber: 'asc' }
            ]
        });

        // Filtra i risultati per verificare che le fermate siano nell'ordine corretto
        // e che rispettino il filtro dell'orario
        const validTrains = trains.filter(train => {
            let departureTimeFromStation: string | null = null;
            let fromStopIndex = -1;
            let toStopIndex = -1;

            // Per treni diretti
            if (fromStationIds.includes(train.startStationId) &&
                toStationIds.includes(train.endStationId)) {
                departureTimeFromStation = train.departureTime;
                // Direct trains are valid by definition
            } else {
                // Per treni con fermate intermedie
                fromStopIndex = train.stops.findIndex(stop =>
                    fromStationIds.includes(stop.stationId)
                );
                toStopIndex = train.stops.findIndex(stop =>
                    toStationIds.includes(stop.stationId)
                );

                // Verifica che le fermate siano nell'ordine corretto
                if (fromStopIndex === -1 || toStopIndex === -1 || fromStopIndex >= toStopIndex) {
                    return false;
                }

                // Get departure time from the from station
                const fromStop = train.stops[fromStopIndex];
                departureTimeFromStation = fromStop.departureTime;
            }

            // Se non abbiamo trovato un orario di partenza dalla stazione, escludi il treno
            if (!departureTimeFromStation) {
                return false;
            }

            // Applica il filtro per l'orario se specificato
            if (validatedSearch.time) {
                return departureTimeFromStation >= validatedSearch.time;
            }

            return true;
        });

        // Ordina i risultati: prima i treni diretti, poi quelli con fermate intermedie
        // e per orario di partenza dalla stazione specifica
        const sortedTrains = validTrains.sort((a, b) => {
            // Prima priorità: treni diretti vs treni con fermate intermedie
            const aIsDirect = fromStationIds.includes(a.startStationId) && toStationIds.includes(a.endStationId);
            const bIsDirect = fromStationIds.includes(b.startStationId) && toStationIds.includes(b.endStationId);

            if (aIsDirect && !bIsDirect) return -1;
            if (!aIsDirect && bIsDirect) return 1;

            // Seconda priorità: orario di partenza dalla stazione specifica
            const getDepartureTimeFromStation = (train: typeof trains[0]) => {
                if (fromStationIds.includes(train.startStationId)) {
                    return train.departureTime;
                } else {
                    const stop = train.stops.find((stop) =>
                        fromStationIds.includes(stop.stationId)
                    );
                    return stop ? stop.departureTime : train.departureTime;
                }
            };

            const timeToDate = (timeStr: string, dateStr?: string) => {
                const baseDate = dateStr || new Date().toISOString().split('T')[0]; // YYYY-MM-DD
                return new Date(`${baseDate}T${timeStr}:00`);
            };

            const aTime = getDepartureTimeFromStation(a);
            const bTime = getDepartureTimeFromStation(b);

            // Handle null times by using the train's departure time as fallback
            const aTimeToUse = aTime || a.departureTime;
            const bTimeToUse = bTime || b.departureTime;

            const aDateTime = timeToDate(aTimeToUse, validatedSearch.date);
            const bDateTime = timeToDate(bTimeToUse, validatedSearch.date);

            const timeDiff = aDateTime.getTime() - bDateTime.getTime();
            if (timeDiff !== 0) {
                return timeDiff;
            }

            // Terza priorità: numero del treno (gestendo i null)
            const aTrainNumber = a.trainNumber || '';
            const bTrainNumber = b.trainNumber || '';
            return aTrainNumber.localeCompare(bTrainNumber);
        });

        return NextResponse.json({
            trains: sortedTrains,
            totalResults: sortedTrains.length,
            searchCriteria: validatedSearch,
            fromStations,
            toStations
        });

    } catch (error) {
        console.error('Error searching trains:', error);
        return NextResponse.json(
            { error: 'Errore nella ricerca dei treni' },
            { status: 500 }
        );
    }
}
