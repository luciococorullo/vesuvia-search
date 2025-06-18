

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const stations = await prisma.station.findMany()
    // Create a map to look up station IDs by numeric codes
    const stationMapByCode = new Map(stations.map(s => [parseInt(s.code), s.id]))

    // Define proper types for the train data
    interface TrainData {
        trainNumber: string;
        category: string;
        isCampaniaExpress: boolean;
        direction: string;
        departureTime: string;
        startStationCode: number;
        endStationCode: number;
        stops: Array<{
            stationCode: number;
            arrivalTime: string;
            departureTime: string;
            stopOrder: number;
        }>;
    }

    const trains: TrainData[] = [
        { "trainNumber": "10541", "category": "DD", "isCampaniaExpress": false, "direction": "NAPOLI-SORRENTO", "departureTime": "5:44", "startStationCode": 27, "endStationCode": 62, "stops": [{ "stationCode": 27, "arrivalTime": "5:51", "departureTime": "5:51", "stopOrder": 1 }, { "stationCode": 29, "arrivalTime": "5:53", "departureTime": "5:53", "stopOrder": 2 }, { "stationCode": 33, "arrivalTime": "5:58", "departureTime": "5:58", "stopOrder": 4 }, { "stationCode": 44, "arrivalTime": "6:09", "departureTime": "6:09", "stopOrder": 5 }, { "stationCode": 49, "arrivalTime": "6:13", "departureTime": "6:13", "stopOrder": 6 }, { "stationCode": 51, "arrivalTime": "6:21", "departureTime": "6:21", "stopOrder": 8 }, { "stationCode": 52, "arrivalTime": "6:27", "departureTime": "6:27", "stopOrder": 9 }, { "stationCode": 53, "arrivalTime": "6:30", "departureTime": "6:30", "stopOrder": 10 }, { "stationCode": 58, "arrivalTime": "6:43", "departureTime": "6:43", "stopOrder": 12 }, { "stationCode": 59, "arrivalTime": "6:47", "departureTime": "6:47", "stopOrder": 13 }, { "stationCode": 60, "arrivalTime": "6:49", "departureTime": "6:49", "stopOrder": 14 }, { "stationCode": 62, "arrivalTime": "6:53", "departureTime": "6:53", "stopOrder": 16 }] }
    ]

    for (const train of trains) {
        // Validate that all required stations exist
        const startStationId = stationMapByCode.get(train.startStationCode);
        const endStationId = stationMapByCode.get(train.endStationCode);

        if (!startStationId) {
            console.error(`Start station with code ${train.startStationCode} not found for train ${train.trainNumber}`);
            continue;
        }

        if (!endStationId) {
            console.error(`End station with code ${train.endStationCode} not found for train ${train.trainNumber}`);
            continue;
        }

        // Validate that all stop stations exist
        const invalidStops = train.stops.filter(stop => !stationMapByCode.get(stop.stationCode));
        if (invalidStops.length > 0) {
            console.error(`Invalid station codes found for train ${train.trainNumber}:`, invalidStops.map(s => s.stationCode));
            continue;
        }

        const createdTrain = await prisma.train.create({
            data: {
                trainNumber: train.trainNumber,
                direction: train.direction,
                departureTime: train.departureTime,
                operatingDays: 'G',
                isCampaniaExpress: train.isCampaniaExpress,
                category: train.category,
                startStationId: startStationId,
                endStationId: endStationId,
                stops: {
                    create: train.stops.map((stop) => ({
                        stationId: stationMapByCode.get(stop.stationCode)!,
                        arrivalTime: stop.arrivalTime,
                        departureTime: stop.departureTime,
                        stopOrder: stop.stopOrder
                    }))
                }
            }
        })
        console.log(`Created train: ${createdTrain.trainNumber}`)
    }
}

main().catch(e => {
    console.error(e)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect()
})