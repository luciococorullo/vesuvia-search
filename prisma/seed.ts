import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// These are the actual stations on the Napoli-Sorrento direct line (main trunk line in EAV network)
const NAPOLI_SORRENTO_STATIONS = [
    'Napoli Porta Nolana',
    'Napoli P. Garibaldi',
    'San Giorgio a Cremano',
    'Portici Bellavista',
    'Ercolano',
    'Torre del Greco',
    'Torre A.ta - Oplonti',
    'Villa Regina',
    'Pompei Scavi Villa dei Misteri',
    'Pioppaino',
    'Via Nocera',
    'Castellammare di Stabia',
    'Vico Equense',
    'Seiano',
    'Meta',
    'Piano',
    'S. Agnello',
    'Sorrento'
];

function generateStationCode(name: string, id: number): string {
    // Use station ID as prefix to ensure uniqueness
    const cleanName = name.replace(/[^a-zA-Z]/g, '').toUpperCase();
    const shortName = cleanName.length >= 2 ? cleanName.substring(0, 2) : cleanName.padEnd(2, 'X');
    return `${id.toString().padStart(2, '0')}${shortName}`.substring(0, 5);
}

async function main() {
    try {
        console.log('🧹 Cleaning existing data...');
        await prisma.trainStop.deleteMany();
        await prisma.train.deleteMany();
        await prisma.station.deleteMany();

        console.log('📍 Creating stations...');
        // Create stations from NAPOLI_SORRENTO_STATIONS with dummy incremental IDs starting from 1
        const stationMap = new Map<number, any>();
        const stationMapByName = new Map<string, any>();

        for (let i = 0; i < NAPOLI_SORRENTO_STATIONS.length; i++) {
            const name = NAPOLI_SORRENTO_STATIONS[i];
            const id = i + 1;
            const dbStation = await prisma.station.create({
                data: {
                    name: name,
                    code: generateStationCode(name, id)
                }
            });
            stationMap.set(id, dbStation);
            stationMapByName.set(name.toUpperCase(), dbStation);
            console.log(`   - Created station: ${name} (${dbStation.code})`);
        }

        console.log('🚂 Loading trains from all_trains.ts...');
        const allTrainsModule = await import('../scripts/all_trains');
        const allTrains = allTrainsModule.allTrains;

        let trainsCreated = 0;

        for (const train of allTrains) {
            const start = stationMapByName.get(train.startStation.toUpperCase());
            const end = stationMapByName.get(train.endStation.toUpperCase());

            if (!start || !end) {
                console.warn(`⚠️  Train ${train.trainNumber} start=${train.startStation}, end=${train.endStation}`);
                continue;
            }

            try {
                const dbTrain = await prisma.train.create({
                    data: {
                        trainNumber: train.trainNumber,
                        direction: train.direction,
                        departureTime: train.departureTime,
                        operatingDays: 'DAILY',
                        isCampaniaExpress: train.isCampaniaExpress,
                        category: train.category.toUpperCase(),
                        startStationId: start.id,
                        endStationId: end.id
                    }
                });

                for (const stop of train.stops) {
                    const st = stationMapByName.get(stop.station.toUpperCase());
                    if (!st) continue;
                    await prisma.trainStop.create({
                        data: {
                            trainId: dbTrain.id,
                            stationId: st.id,
                            arrivalTime: stop.time,
                            departureTime: stop.time,
                            stopOrder: stop.stopOrder
                        }
                    });
                }

                trainsCreated++;
            } catch (error) {
                console.warn(`⚠️  Failed to create train ${train.trainNumber}:`, error);
            }
        }

        console.log(`✅ Successfully loaded ${trainsCreated} trains`);
        console.log(`📊 Database summary:`);

        const stationCount = await prisma.station.count();
        const trainCount = await prisma.train.count();
        const stopCount = await prisma.trainStop.count();
        const napoliToSorrento = await prisma.train.count({
            where: { direction: 'SORRENTO' }
        });
        const sorrentoToNapoli = await prisma.train.count({
            where: { direction: 'NAPOLI' }
        });

        console.log(`   - Stations: ${stationCount}`);
        console.log(`   - Total trains: ${trainCount}`);
        console.log(`   - Total stops: ${stopCount}`);
        console.log(`   - Napoli → Sorrento: ${napoliToSorrento}`);
        console.log(`   - Sorrento → Napoli: ${sorrentoToNapoli}`);

        // Show some example stations
        console.log('\n📍 Sample stations loaded:');
        const sampleStations = await prisma.station.findMany({
            take: 10,
            orderBy: { id: 'asc' }
        });

        sampleStations.forEach(station => {
            console.log(`   - ${station.name} (${station.code})`);
        });

    } catch (error) {
        console.error('❌ Error loading data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
