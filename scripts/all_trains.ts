
import fs from 'fs';
import path from 'path';

interface Stop {
    station: string;
    time: string;
    stopOrder: number;
}

interface Train {
    trainNumber: string;
    category: 'Regionale' | 'Campania Express';
    isCampaniaExpress: boolean;
    direction: 'NAPOLI' | 'SORRENTO';
    departureTime: string;
    startStation: string;
    endStation: string;
    stops: Stop[];
}

function loadTrainsFromCsv(filePath: string, direction: Train['direction']): Train[] {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.trim().split(/\r?\n/);
    const headers = lines[0].split(',');
    const trainCols = headers.slice(1);
    const rows = lines.slice(1).map(line => line.split(','));
    const stationNames = rows.map(cols => cols[0].trim());

    return trainCols.map((col, idx) => {
        const stops: Stop[] = [];
        rows.forEach((cols, rowIndex) => {
            const time = cols[idx + 1]?.trim();
            if (time && time !== '|') {
                stops.push({
                    station: stationNames[rowIndex],
                    time,
                    stopOrder: stops.length + 1,
                });
            }
        });
        const trainNumber = col.replace(/\D/g, '');
        const isCampaniaExpress = stops.length <= 10;
        return {
            trainNumber,
            category: isCampaniaExpress ? 'Campania Express' : 'Regionale',
            isCampaniaExpress,
            direction,
            departureTime: stops[0]?.time || '',
            startStation: stops[0]?.station || '',
            endStation: stops[stops.length - 1]?.station || '',
            stops,
        };
    });
}

const nsCsv = path.resolve(__dirname, '../data/orari_napoli_sorrento.csv');
const snCsv = path.resolve(__dirname, '../data/orari_sorrento_napoli.csv');

export const allTrains: Train[] = [
    ...loadTrainsFromCsv(nsCsv, 'SORRENTO'),
    ...loadTrainsFromCsv(snCsv, 'NAPOLI'),
];