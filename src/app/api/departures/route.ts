import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Schema per la ricerca delle prossime partenze
const DeparturesSearchSchema = z.object({
    from: z.string().min(1, 'Stazione di partenza richiesta'),
    date: z.string().optional(), // YYYY-MM-DD format
    time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
    isCampaniaExpress: z.boolean().optional(),
});

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const searchData = {
            from: searchParams.get('from') || '',
            date: searchParams.get('date') || undefined,
            time: searchParams.get('time') || undefined,
            isCampaniaExpress: searchParams.get('isCampaniaExpress') === 'true' ? true : undefined,
        };

        // Remove undefined values to avoid Zod validation issues
        const cleanedSearchData = Object.fromEntries(
            Object.entries(searchData).filter(([, value]) => value !== undefined)
        );

        const validatedSearch = DeparturesSearchSchema.parse(cleanedSearchData);

        // Trova le stazioni per codice o nome
        const fromStations = await prisma.station.findMany({
            where: {
                OR: [
                    { code: { contains: validatedSearch.from } },
                    { name: { contains: validatedSearch.from } }
                ]
            }
        });

        if (fromStations.length === 0) {
            return NextResponse.json({
                trains: [],
                totalResults: 0,
                message: 'Nessuna stazione trovata con i criteri specificati'
            });
        }

        const fromStationIds = fromStations.map(s => s.id);

        // Costruisci il filtro per i treni che partono dalla stazione
        const where: {
            OR: Array<{
                startStationId?: { in: number[] };
                stops?: {
                    some: {
                        stationId: { in: number[] };
                    };
                };
            }>;
            isCampaniaExpress?: boolean;
            departureTime?: { gte: string };
        } = {
            OR: [
                // Treni che partono da questa stazione
                { startStationId: { in: fromStationIds } },
                // Treni che fermano in questa stazione
                {
                    stops: {
                        some: {
                            stationId: { in: fromStationIds }
                        }
                    }
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

        // Filtra i risultati per includere solo i treni che effettivamente partono dalla stazione richiesta
        // e che rispettano il filtro dell'orario
        const validTrains = trains.filter(train => {
            let departureTimeFromStation: string | null = null;

            // Check if train starts from one of the from stations
            if (fromStationIds.includes(train.startStationId)) {
                departureTimeFromStation = train.departureTime;
            } else {
                // Check if train stops at one of the from stations
                const stop = train.stops.find(stop =>
                    fromStationIds.includes(stop.stationId)
                );
                if (stop) {
                    departureTimeFromStation = stop.departureTime;
                }
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

        // Ordina i risultati: prima i treni che partono dalla stazione, poi quelli che ci fermano
        const sortedTrains = validTrains.sort((a, b) => {
            // Prima priorità: treni che partono dalla stazione selezionata
            const aStartsHere = fromStationIds.includes(a.startStationId);
            const bStartsHere = fromStationIds.includes(b.startStationId);

            if (aStartsHere && !bStartsHere) return -1;
            if (!aStartsHere && bStartsHere) return 1;

            // Seconda priorità: orario di partenza dalla stazione specifica (non l'orario generale del treno)
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
            toStations: [] // Per le partenze non abbiamo stazioni di arrivo specifiche
        });

    } catch (error) {
        console.error('Error searching departures:', error);
        return NextResponse.json(
            { error: 'Errore nella ricerca delle partenze' },
            { status: 500 }
        );
    }
}
