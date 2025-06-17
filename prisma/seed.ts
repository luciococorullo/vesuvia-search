import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🚂 Iniziando il seeding del database...');

    // Prima pulisci i dati esistenti
    await prisma.trainStop.deleteMany();
    await prisma.train.deleteMany();
    await prisma.station.deleteMany();

    // Crea le stazioni dalla tabella
    const stations = [
        { name: 'NAPOLI PORTA NOLANA', code: 'NAP' },
        { name: 'NAPOLI P. GARIBALDI', code: 'GAR' },
        { name: 'SAN GIOVANNI A CREMANO', code: 'SGC' },
        { name: 'PORTICI BELLAVISTA', code: 'PBV' },
        { name: 'ERCOLANO', code: 'ERC' },
        { name: 'TORRE DEL GRECO', code: 'TDG' },
        { name: 'TORRE ANNUNZIATA OPLONTI', code: 'TAO' },
        { name: 'Villa Regina', code: 'VRG' },
        { name: 'POMPEI SANTUARIO VILLA DEI MISTERI', code: 'PSV' },
        { name: 'Moregine', code: 'MOR' },
        { name: 'POMPEI', code: 'POM' },
        { name: 'Via Nocera', code: 'VNO' },
        { name: 'CASTELLAMMARE DI STABIA', code: 'CDS' },
        { name: 'VICO EQUENSE', code: 'VEQ' },
        { name: 'Seiano', code: 'SEI' },
        { name: 'META', code: 'MET' },
        { name: 'PIANO', code: 'PIA' },
        { name: 'S.Agnello', code: 'SAG' },
        { name: 'SORRENTO', code: 'SOR' }
    ];

    console.log('📍 Creando stazioni...');
    const createdStations = await prisma.station.createMany({
        data: stations
    });
    console.log(`✅ Create ${createdStations.count} stazioni`);

    // Recupera le stazioni create per ottenere gli ID
    const stationMap = new Map();
    const allStations = await prisma.station.findMany();
    allStations.forEach(station => {
        stationMap.set(station.code, station.id);
    });

    // Treni direzione SORRENTO (da Napoli a Sorrento)
    const trainsToSorrento = [
        // Treni feriali (DO - Lunedì-Venerdì)
        { trainNumber: '10530', departureTime: '5:41', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '10532', departureTime: '6:17', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '10534', departureTime: '6:53', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '10702', departureTime: '7:29', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '10738', departureTime: '8:05', category: 'CAMPANIA_EXPRESS', operatingDays: 'WEEKDAYS_ONLY', isCampaniaExpress: true },
        { trainNumber: '10082', departureTime: '8:22', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '10088', departureTime: '8:41', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '10094', departureTime: '9:17', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '11018', departureTime: '9:53', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '11106', departureTime: '10:55', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '11112', departureTime: '11:31', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '11118', departureTime: '12:07', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '11124', departureTime: '12:43', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '11130', departureTime: '13:19', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '11318', departureTime: '13:55', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '11136', departureTime: '14:31', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '11142', departureTime: '15:07', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '11148', departureTime: '15:43', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '11154', departureTime: '16:19', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '11602', departureTime: '16:55', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '11618', departureTime: '17:31', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '11166', departureTime: '17:05', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '11174', departureTime: '17:41', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '11178', departureTime: '18:17', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '11184', departureTime: '18:53', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '11190', departureTime: '19:29', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '11918', departureTime: '20:05', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '11196', departureTime: '20:41', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '11202', departureTime: '21:17', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '11208', departureTime: '21:53', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '11214', departureTime: '22:11', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },

        // Treni festivi (alcuni sono diversi)
        { trainNumber: '11114', departureTime: '11:50', category: 'REGIONALE', operatingDays: 'WEEKENDS_ONLY' },
        { trainNumber: '11920', departureTime: '19:38', category: 'REGIONALE', operatingDays: 'WEEKENDS_ONLY' },
        { trainNumber: '12202', departureTime: '22:02', category: 'REGIONALE', operatingDays: 'WEEKENDS_ONLY' },
    ];

    console.log('🚂 Creando treni direzione Sorrento...');
    for (const trainData of trainsToSorrento) {
        const train = await prisma.train.create({
            data: {
                trainNumber: trainData.trainNumber,
                direction: 'SORRENTO',
                departureTime: trainData.departureTime,
                operatingDays: trainData.operatingDays as any,
                category: trainData.category === 'CAMPANIA_EXPRESS' ? 'CAMPANIA_EXPRESS' : 'REGIONALE',
                isCampaniaExpress: trainData.isCampaniaExpress || false,
                startStationId: stationMap.get('NAP'),
                endStationId: stationMap.get('SOR'),
            }
        });

        // Aggiungi tutte le fermate per ogni treno
        const stops = [
            { stationCode: 'NAP', departureTime: trainData.departureTime, order: 1 },
            { stationCode: 'GAR', arrivalTime: addMinutes(trainData.departureTime, 3), departureTime: addMinutes(trainData.departureTime, 4), order: 2 },
            { stationCode: 'SGC', arrivalTime: addMinutes(trainData.departureTime, 8), departureTime: addMinutes(trainData.departureTime, 9), order: 3 },
            { stationCode: 'PBV', arrivalTime: addMinutes(trainData.departureTime, 12), departureTime: addMinutes(trainData.departureTime, 13), order: 4 },
            { stationCode: 'ERC', arrivalTime: addMinutes(trainData.departureTime, 16), departureTime: addMinutes(trainData.departureTime, 17), order: 5 },
            { stationCode: 'TDG', arrivalTime: addMinutes(trainData.departureTime, 21), departureTime: addMinutes(trainData.departureTime, 22), order: 6 },
            { stationCode: 'TAO', arrivalTime: addMinutes(trainData.departureTime, 27), departureTime: addMinutes(trainData.departureTime, 28), order: 7 },
            { stationCode: 'VRG', arrivalTime: addMinutes(trainData.departureTime, 31), departureTime: addMinutes(trainData.departureTime, 32), order: 8 },
            { stationCode: 'PSV', arrivalTime: addMinutes(trainData.departureTime, 36), departureTime: addMinutes(trainData.departureTime, 37), order: 9 },
            { stationCode: 'MOR', arrivalTime: addMinutes(trainData.departureTime, 40), departureTime: addMinutes(trainData.departureTime, 41), order: 10 },
            { stationCode: 'POM', arrivalTime: addMinutes(trainData.departureTime, 44), departureTime: addMinutes(trainData.departureTime, 45), order: 11 },
            { stationCode: 'VNO', arrivalTime: addMinutes(trainData.departureTime, 49), departureTime: addMinutes(trainData.departureTime, 50), order: 12 },
            { stationCode: 'CDS', arrivalTime: addMinutes(trainData.departureTime, 54), departureTime: addMinutes(trainData.departureTime, 55), order: 13 },
            { stationCode: 'VEQ', arrivalTime: addMinutes(trainData.departureTime, 59), departureTime: addMinutes(trainData.departureTime, 60), order: 14 },
            { stationCode: 'SEI', arrivalTime: addMinutes(trainData.departureTime, 64), departureTime: addMinutes(trainData.departureTime, 65), order: 15 },
            { stationCode: 'MET', arrivalTime: addMinutes(trainData.departureTime, 69), departureTime: addMinutes(trainData.departureTime, 70), order: 16 },
            { stationCode: 'PIA', arrivalTime: addMinutes(trainData.departureTime, 74), departureTime: addMinutes(trainData.departureTime, 75), order: 17 },
            { stationCode: 'SAG', arrivalTime: addMinutes(trainData.departureTime, 79), departureTime: addMinutes(trainData.departureTime, 80), order: 18 },
            { stationCode: 'SOR', arrivalTime: addMinutes(trainData.departureTime, 84), order: 19 },
        ];

        // Se è Campania Express, salta alcune fermate
        const filteredStops = trainData.isCampaniaExpress
            ? stops.filter(stop => ['NAP', 'GAR', 'ERC', 'POM', 'CDS', 'VEQ', 'MET', 'SOR'].includes(stop.stationCode))
            : stops;

        for (const [index, stop] of filteredStops.entries()) {
            await prisma.trainStop.create({
                data: {
                    trainId: train.id,
                    stationId: stationMap.get(stop.stationCode),
                    arrivalTime: stop.arrivalTime,
                    departureTime: stop.departureTime,
                    stopOrder: index + 1,
                }
            });
        }
    }

    // Treni direzione NAPOLI (da Sorrento a Napoli)
    const trainsToNapoli = [
        // Treni feriali
        { trainNumber: '10531', departureTime: '5:30', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '10533', departureTime: '5:52', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '10535', departureTime: '6:28', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '10537', departureTime: '6:33', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '10541', departureTime: '6:37', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '10544', departureTime: '6:04', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '10552', departureTime: '6:12', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '10555', departureTime: '6:15', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '10561', departureTime: '6:21', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '10565', departureTime: '6:30', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '10610', departureTime: '6:30', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '10613', departureTime: '6:33', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '10617', departureTime: '6:37', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '10627', departureTime: '6:47', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '10630', departureTime: '6:50', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '10633', departureTime: '6:53', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '10635', departureTime: '6:56', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '10644', departureTime: '7:05', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '10646', departureTime: '7:07', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },

        // Campania Express di ritorno
        { trainNumber: '10739', departureTime: '7:38', category: 'CAMPANIA_EXPRESS', operatingDays: 'WEEKDAYS_ONLY', isCampaniaExpress: true },
        { trainNumber: '10818', departureTime: '8:18', category: 'CAMPANIA_EXPRESS', operatingDays: 'WEEKDAYS_ONLY', isCampaniaExpress: true },

        // Altri treni feriali
        { trainNumber: '11101', departureTime: '11:01', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '11122', departureTime: '11:22', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '11135', departureTime: '11:35', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '11602', departureTime: '16:20', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '17501', departureTime: '17:01', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
        { trainNumber: '17522', departureTime: '17:22', category: 'REGIONALE', operatingDays: 'WEEKDAYS_ONLY' },
    ];

    console.log('🚂 Creando treni direzione Napoli...');
    for (const trainData of trainsToNapoli) {
        const train = await prisma.train.create({
            data: {
                trainNumber: trainData.trainNumber,
                direction: 'NAPOLI',
                departureTime: trainData.departureTime,
                operatingDays: trainData.operatingDays as any,
                category: trainData.category === 'CAMPANIA_EXPRESS' ? 'CAMPANIA_EXPRESS' : 'REGIONALE',
                isCampaniaExpress: trainData.isCampaniaExpress || false,
                startStationId: stationMap.get('SOR'),
                endStationId: stationMap.get('NAP'),
            }
        });

        // Aggiungi fermate per treni direzione Napoli (invertite)
        const stopsReverse = [
            { stationCode: 'SOR', departureTime: trainData.departureTime, order: 1 },
            { stationCode: 'SAG', arrivalTime: addMinutes(trainData.departureTime, 5), departureTime: addMinutes(trainData.departureTime, 6), order: 2 },
            { stationCode: 'PIA', arrivalTime: addMinutes(trainData.departureTime, 10), departureTime: addMinutes(trainData.departureTime, 11), order: 3 },
            { stationCode: 'MET', arrivalTime: addMinutes(trainData.departureTime, 15), departureTime: addMinutes(trainData.departureTime, 16), order: 4 },
            { stationCode: 'SEI', arrivalTime: addMinutes(trainData.departureTime, 20), departureTime: addMinutes(trainData.departureTime, 21), order: 5 },
            { stationCode: 'VEQ', arrivalTime: addMinutes(trainData.departureTime, 25), departureTime: addMinutes(trainData.departureTime, 26), order: 6 },
            { stationCode: 'CDS', arrivalTime: addMinutes(trainData.departureTime, 30), departureTime: addMinutes(trainData.departureTime, 31), order: 7 },
            { stationCode: 'VNO', arrivalTime: addMinutes(trainData.departureTime, 35), departureTime: addMinutes(trainData.departureTime, 36), order: 8 },
            { stationCode: 'POM', arrivalTime: addMinutes(trainData.departureTime, 40), departureTime: addMinutes(trainData.departureTime, 41), order: 9 },
            { stationCode: 'MOR', arrivalTime: addMinutes(trainData.departureTime, 44), departureTime: addMinutes(trainData.departureTime, 45), order: 10 },
            { stationCode: 'PSV', arrivalTime: addMinutes(trainData.departureTime, 49), departureTime: addMinutes(trainData.departureTime, 50), order: 11 },
            { stationCode: 'VRG', arrivalTime: addMinutes(trainData.departureTime, 54), departureTime: addMinutes(trainData.departureTime, 55), order: 12 },
            { stationCode: 'TAO', arrivalTime: addMinutes(trainData.departureTime, 58), departureTime: addMinutes(trainData.departureTime, 59), order: 13 },
            { stationCode: 'TDG', arrivalTime: addMinutes(trainData.departureTime, 64), departureTime: addMinutes(trainData.departureTime, 65), order: 14 },
            { stationCode: 'ERC', arrivalTime: addMinutes(trainData.departureTime, 69), departureTime: addMinutes(trainData.departureTime, 70), order: 15 },
            { stationCode: 'PBV', arrivalTime: addMinutes(trainData.departureTime, 74), departureTime: addMinutes(trainData.departureTime, 75), order: 16 },
            { stationCode: 'SGC', arrivalTime: addMinutes(trainData.departureTime, 78), departureTime: addMinutes(trainData.departureTime, 79), order: 17 },
            { stationCode: 'GAR', arrivalTime: addMinutes(trainData.departureTime, 83), departureTime: addMinutes(trainData.departureTime, 84), order: 18 },
            { stationCode: 'NAP', arrivalTime: addMinutes(trainData.departureTime, 87), order: 19 },
        ];

        // Se è Campania Express, salta alcune fermate
        const filteredStops = trainData.isCampaniaExpress
            ? stopsReverse.filter(stop => ['SOR', 'MET', 'VEQ', 'CDS', 'POM', 'ERC', 'GAR', 'NAP'].includes(stop.stationCode))
            : stopsReverse;

        for (const [index, stop] of filteredStops.entries()) {
            await prisma.trainStop.create({
                data: {
                    trainId: train.id,
                    stationId: stationMap.get(stop.stationCode),
                    arrivalTime: stop.arrivalTime,
                    departureTime: stop.departureTime,
                    stopOrder: index + 1,
                }
            });
        }
    }

    console.log('✅ Seeding completato!');

    // Mostra statistiche
    const stationCount = await prisma.station.count();
    const trainCount = await prisma.train.count();
    const stopCount = await prisma.trainStop.count();
    const campaniaExpressCount = await prisma.train.count({ where: { isCampaniaExpress: true } });

    console.log(`📊 Statistiche finali:`);
    console.log(`   🏪 Stazioni: ${stationCount}`);
    console.log(`   🚂 Treni: ${trainCount}`);
    console.log(`   ⏸️  Fermate: ${stopCount}`);
    console.log(`   🟡 Campania Express: ${campaniaExpressCount}`);
}

// Utility function to add minutes to a time string
function addMinutes(timeStr: string, minutes: number): string {
    const [hours, mins] = timeStr.split(':').map(Number);
    const totalMinutes = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMins = totalMinutes % 60;
    return `${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`;
}

main()
    .catch((e) => {
        console.error('❌ Errore durante il seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
