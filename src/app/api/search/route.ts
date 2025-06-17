import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { TrainSearchSchema } from '@/lib/types';

export async function GET(request: NextRequest) {
    try {
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

        const validatedSearch = TrainSearchSchema.parse(cleanedSearchData);

        // Trova le stazioni per codice o nome
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

        // Aggiungi filtro per orario se specificato
        if (validatedSearch.time) {
            where.departureTime = { gte: validatedSearch.time };
        }

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
            orderBy: { departureTime: 'asc' }
        });

        // Filtra i risultati per verificare che le fermate siano nell'ordine corretto
        const validTrains = trains.filter(train => {
            // Per treni diretti
            if (fromStationIds.includes(train.startStationId) &&
                toStationIds.includes(train.endStationId)) {
                return true;
            }

            // Per treni con fermate intermedie
            const fromStopIndex = train.stops.findIndex(stop =>
                fromStationIds.includes(stop.stationId)
            );
            const toStopIndex = train.stops.findIndex(stop =>
                toStationIds.includes(stop.stationId)
            );

            return fromStopIndex !== -1 && toStopIndex !== -1 && fromStopIndex < toStopIndex;
        });

        return NextResponse.json({
            trains: validTrains,
            totalResults: validTrains.length,
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
