import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// These are the actual stations on the Napoli-Sorrento direct line (from official route map)
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

interface CSVStation {
    id: number;
    name: string;
    bacino: number;
    latitude: number;
    longitude: number;
    isStation: boolean;
    isTerminal: boolean;
    isDiramazione: boolean;
    chilometrica: number;
    isDismessa: boolean;
    isDisabilitata: boolean;
    codiceIstat: string;
}

interface CSVTrain {
    Id: string;
    Linea: string;
    Treno: string;
    Bacino: string;
    Tipologia: string;
    Partenza: string; // DateTime
    Arrivo: string; // DateTime
    Categoria: string;
    Codice_Destinazione: string;
    Destinazione: string;
    Codice_Partenza: string;
    Partenza_Station: string;
    Linea_Route: string;
    Validita: string;
}

// Parse stations CSV
function parseStationCSVLine(line: string): CSVStation | null {
    const parts = line.split(',');
    if (parts.length < 12) return null;

    const chilometrica = parts[8] === 'NULL' ? 0 : parseFloat(parts[8]);

    return {
        id: parseInt(parts[0]),
        name: parts[1],
        bacino: parseInt(parts[2]),
        latitude: parseFloat(parts[3]),
        longitude: parseFloat(parts[4]),
        isStation: parts[5] === '1',
        isTerminal: parts[6] === '1',
        isDiramazione: parts[7] === '1',
        chilometrica: chilometrica,
        isDismessa: parts[9] === '1',
        isDisabilitata: parts[10] === '1',
        codiceIstat: parts[11]
    };
}

// Parse trains CSV
function parseTrainCSVLine(line: string): CSVTrain | null {
    const parts = line.split(',');
    if (parts.length < 14) return null;

    return {
        Id: parts[0],
        Linea: parts[1],
        Treno: parts[2],
        Bacino: parts[3],
        Tipologia: parts[4],
        Partenza: parts[5],
        Arrivo: parts[6],
        Categoria: parts[7],
        Codice_Destinazione: parts[8],
        Destinazione: parts[9],
        Codice_Partenza: parts[10],
        Partenza_Station: parts[11],
        Linea_Route: parts[12],
        Validita: parts[13]
    };
}

function extractTimeFromDateTime(dateTimeString: string): string {
    const match = dateTimeString.match(/\d{4}-\d{2}-\d{2} (\d{2}:\d{2})/);
    return match ? match[1] : '00:00';
}

function mapCategory(categoria: string): 'REGIONALE' | 'INTERCITY' | 'CAMPANIA_EXPRESS' {
    switch (categoria.toUpperCase()) {
        case 'DD':
            return 'REGIONALE'; // Direttissimo -> Regionale in our schema
        case 'D':
            return 'INTERCITY'; // Diretto -> Intercity in our schema
        case 'CE':
        case 'CAMPANIA_EXPRESS':
            return 'CAMPANIA_EXPRESS';
        default:
            return 'REGIONALE';
    }
}

function determineOperatingDays(): 'WEEKDAYS_ONLY' | 'WEEKENDS_ONLY' | 'DAILY' | 'WEEKDAYS_AND_SATURDAY' {
    return 'DAILY';
}

function generateStationCode(name: string, id: number): string {
    // Use station ID as prefix to ensure uniqueness
    const cleanName = name.replace(/[^a-zA-Z]/g, '').toUpperCase();
    const shortName = cleanName.length >= 2 ? cleanName.substring(0, 2) : cleanName.padEnd(2, 'X');
    return `${id.toString().padStart(2, '0')}${shortName}`.substring(0, 5);
}

async function loadCompleteData() {
    try {
        console.log('🧹 Cleaning existing data...');
        await prisma.trainStop.deleteMany();
        await prisma.train.deleteMany();
        await prisma.station.deleteMany();

        console.log('📍 Loading stations from CSV...');
        const stationsPath = path.join(process.cwd(), 'Elenco Stazioni.csv');
        const stationsContent = fs.readFileSync(stationsPath, 'utf-8');
        const stationLines = stationsContent.split('\n').filter(line => line.trim() !== '');

        // Skip header line
        const stationDataLines = stationLines.slice(1);

        // Filter and sort Circumvesuviana line stations (Bacino = 1) for Napoli-Sorrento route
        // Only include stations that are on the direct Napoli-Sorrento line
        const circumvesuvianaStations: CSVStation[] = [];

        for (const line of stationDataLines) {
            const station = parseStationCSVLine(line);
            if (station &&
                station.bacino === 1 &&
                station.isDismessa === false && // Dismessa = 0 (not dismantled)
                !station.isDisabilitata) {      // Not temporarily disabled

                // Check if this station is on the direct Napoli-Sorrento line
                const normalizedStationName = station.name.trim().toLowerCase();

                // Exclude stations that are definitely not on the direct line
                if (normalizedStationName.includes('nola') ||
                    normalizedStationName.includes('miglio d\'oro')) {
                    // Don't exclude if it's Napoli Porta Nolana
                    if (!normalizedStationName.includes('napoli porta nolana')) {
                        continue;
                    }
                }

                const isOnDirectLine = NAPOLI_SORRENTO_STATIONS.some(validName => {
                    const normalizedValidName = validName.trim().toLowerCase();
                    // Check exact match or if station name contains the valid name (for variations)
                    return normalizedStationName === normalizedValidName ||
                        normalizedStationName.includes(normalizedValidName) ||
                        normalizedValidName.includes(normalizedStationName) ||
                        // Handle specific variations
                        (normalizedValidName.includes('torre a.ta') && normalizedStationName.includes('torre annunziata')) ||
                        (normalizedValidName.includes('san giorgio') && normalizedStationName.includes('san giorgio')) ||
                        (normalizedValidName.includes('ercolano') && normalizedStationName.includes('ercolano') && !normalizedStationName.includes('miglio'));
                });

                if (isOnDirectLine) {
                    circumvesuvianaStations.push(station);
                }
            }
        }

        // Sort by chilometrica, but handle 0.000 and NULL values properly
        circumvesuvianaStations.sort((a, b) => {
            // Handle Napoli Porta Nolana as the starting point
            if (a.name === 'Napoli Porta Nolana') return -1;
            if (b.name === 'Napoli Porta Nolana') return 1;

            // Then sort by chilometrica
            return a.chilometrica - b.chilometrica;
        });

        // Find Napoli Porta Nolana and Sorrento to determine the route
        const napoliIndex = circumvesuvianaStations.findIndex(s => s.name === 'Napoli Porta Nolana');
        const sorrentoIndex = circumvesuvianaStations.findIndex(s => s.name === 'Sorrento');

        if (napoliIndex === -1 || sorrentoIndex === -1) {
            throw new Error('Could not find Napoli Porta Nolana or Sorrento stations');
        }

        // Get all stations between and including Napoli and Sorrento
        const routeStations = circumvesuvianaStations.slice(napoliIndex, sorrentoIndex + 1);

        console.log(`📍 Found ${routeStations.length} stations on Napoli-Sorrento route`);

        // Create stations in database
        const stationMap = new Map<number, any>();

        for (const csvStation of routeStations) {
            const dbStation = await prisma.station.create({
                data: {
                    name: csvStation.name,
                    code: generateStationCode(csvStation.name, csvStation.id)
                }
            });
            stationMap.set(csvStation.id, dbStation);
            console.log(`   - Created station: ${csvStation.name} (${dbStation.code})`);
        }

        console.log('🚂 Loading trains from CSV...');
        const trainsPath = path.join(process.cwd(), 'napoli_sorrento_trains.csv');
        const trainsContent = fs.readFileSync(trainsPath, 'utf-8');
        const trainLines = trainsContent.split('\n').filter(line => line.trim() !== '');

        let trainsCreated = 0;

        // Get Napoli and Sorrento station IDs
        const napoliStation = stationMap.get(1); // Napoli Porta Nolana has ID 1
        const sorrentoStation = stationMap.get(62); // Sorrento has ID 62

        for (const line of trainLines) {
            const train = parseTrainCSVLine(line);
            if (!train) continue;

            // Filter by validity - only include trains with the valid value
            if (train.Validita.trim() !== '-382156356') {
                continue;
            }

            // Determine direction based on destination
            const isToSorrento = train.Destinazione.toLowerCase().includes('sorrento');
            const direction = isToSorrento ? 'SORRENTO' : 'NAPOLI';

            // Set start and end stations
            const startStationId = isToSorrento ? napoliStation.id : sorrentoStation.id;
            const endStationId = isToSorrento ? sorrentoStation.id : napoliStation.id;

            try {
                const dbTrain = await prisma.train.create({
                    data: {
                        trainNumber: train.Treno,
                        direction: direction,
                        departureTime: extractTimeFromDateTime(train.Partenza),
                        operatingDays: determineOperatingDays(),
                        isCampaniaExpress: train.Categoria === 'CE' || train.Linea_Route.includes('CAMPANIA EXPRESS'),
                        category: mapCategory(train.Categoria),
                        startStationId: startStationId,
                        endStationId: endStationId
                    }
                });

                // Create intermediate stops for each train
                // Only use actual stations (not just passing points) that are active
                const activeStations = routeStations.filter(s =>
                    s.isStation === true &&
                    s.isDismessa === false &&
                    stationMap.has(s.id)
                );
                const stationsToUse = isToSorrento ? activeStations : [...activeStations].reverse();

                for (let i = 0; i < stationsToUse.length; i++) {
                    const station = stationsToUse[i];
                    const dbStationForStop = stationMap.get(station.id);

                    if (dbStationForStop) {
                        // Calculate approximate times based on distance and average speed
                        const baseTime = extractTimeFromDateTime(train.Partenza);
                        const [hours, minutes] = baseTime.split(':').map(Number);
                        const totalMinutes = hours * 60 + minutes;

                        // Estimate travel time: ~2 minutes per km average
                        const travelMinutes = Math.round(station.chilometrica * 2);
                        const stationTime = isToSorrento
                            ? totalMinutes + travelMinutes
                            : totalMinutes + (42.388 * 2) - travelMinutes; // 42.388 is total distance

                        const finalHours = Math.floor(stationTime / 60) % 24;
                        const finalMins = stationTime % 60;
                        const timeString = `${finalHours.toString().padStart(2, '0')}:${finalMins.toString().padStart(2, '0')}`;

                        await prisma.trainStop.create({
                            data: {
                                trainId: dbTrain.id,
                                stationId: dbStationForStop.id,
                                arrivalTime: timeString,
                                departureTime: timeString,
                                stopOrder: i + 1
                            }
                        });
                    }
                }

                trainsCreated++;
            } catch (error) {
                console.warn(`⚠️  Failed to create train ${train.Treno}:`, error);
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

loadCompleteData();
