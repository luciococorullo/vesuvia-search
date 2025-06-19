/**
 * @fileoverview EAV Official Stations Data
 * 
 * This file contains all stations from the official EAV API with their IDs,
 * coordinates, and metadata. These station IDs are used to query the official
 * EAV train planner API for real-time schedule information.
 * 
 * Data source: Official EAV API
 * @version 1.0.0
 */

/**
 * Interface for EAV station data structure
 */
export interface EAVStation {
    /** Unique station ID used by EAV API */
    id: string;
    /** Full station name in Italian */
    nome: string;
    /** Station latitude coordinate */
    lat: number;
    /** Station longitude coordinate */
    long: number;
    /** Kilometric distance from the starting point */
    chilometrica: number;
}

/**
 * Complete list of EAV Circumvesuviana stations
 * Ordered by kilometric distance from Napoli Porta Nolana
 */
export const EAV_STATIONS: EAVStation[] = [
    {
        "id": "1",
        "nome": "Napoli Porta Nolana",
        "lat": 40.849223,
        "long": 14.269264,
        "chilometrica": 0.0
    },
    {
        "id": "3",
        "nome": "Napoli P. Garibaldi",
        "lat": 40.851017,
        "long": 14.272976,
        "chilometrica": 0.545
    },
    {
        "id": "4",
        "nome": "Via Gianturco",
        "lat": 40.845922,
        "long": 14.287257,
        "chilometrica": 1.998
    },
    {
        "id": "5",
        "nome": "S. Giovanni a Teduccio",
        "lat": 40.84171,
        "long": 14.300152,
        "chilometrica": 3.209
    },
    {
        "id": "6",
        "nome": "Barra",
        "lat": 40.844001,
        "long": 14.314253,
        "chilometrica": 4.486
    },
    {
        "id": "26",
        "nome": "S. Maria del Pozzo",
        "lat": 40.84018,
        "long": 14.327495,
        "chilometrica": 5.832
    },
    {
        "id": "27",
        "nome": "san giorgio a cremano",
        "lat": 40.832653,
        "long": 14.337712,
        "chilometrica": 7.048
    },
    {
        "id": "28",
        "nome": "S. Giorgio Cavalli di Bronzo",
        "lat": 40.828805,
        "long": 14.340661,
        "chilometrica": 7.546
    },
    {
        "id": "29",
        "nome": "Portici Bellavista",
        "lat": 40.82267,
        "long": 14.34318,
        "chilometrica": 8.262
    },
    {
        "id": "30",
        "nome": "Portici Via Liberta'",
        "lat": 40.816813,
        "long": 14.346132,
        "chilometrica": 8.956
    },
    {
        "id": "31",
        "nome": "Ercolano Scavi",
        "lat": 40.808913,
        "long": 14.354887,
        "chilometrica": 10.115
    },
    {
        "id": "32",
        "nome": "Ercolano Miglio d'Oro",
        "lat": 40.802102,
        "long": 14.361347,
        "chilometrica": 11.048
    },
    {
        "id": "33",
        "nome": "Torre del Greco",
        "lat": 40.793105,
        "long": 14.369915,
        "chilometrica": 12.277
    },
    {
        "id": "34",
        "nome": "Via S. Antonio",
        "lat": 40.784248,
        "long": 14.384107,
        "chilometrica": 13.847
    },
    {
        "id": "35",
        "nome": "Via del Monte",
        "lat": 40.778211,
        "long": 14.392364,
        "chilometrica": 14.804
    },
    {
        "id": "36",
        "nome": "Via dei Monaci",
        "lat": 40.775671,
        "long": 14.400219,
        "chilometrica": 15.544
    },
    {
        "id": "37",
        "nome": "Villa delle Ginestre",
        "lat": 40.772198,
        "long": 14.40839,
        "chilometrica": 16.348
    },
    {
        "id": "38",
        "nome": "Leopardi",
        "lat": 40.766047,
        "long": 14.417619,
        "chilometrica": 17.399
    },
    {
        "id": "39",
        "nome": "Via Viuli",
        "lat": 40.76382,
        "long": 14.428266,
        "chilometrica": 18.302
    },
    {
        "id": "40",
        "nome": "Trecase",
        "lat": 40.761797,
        "long": 14.4396,
        "chilometrica": 19.33
    },
    {
        "id": "41",
        "nome": "Torre Annunziata - Oplonti",
        "lat": 40.759526,
        "long": 14.451518,
        "chilometrica": 20.375
    },
    {
        "id": "49",
        "nome": "Pompei Scavi Villa dei Misteri",
        "lat": 40.748639,
        "long": 14.481274,
        "chilometrica": 23.487
    },
    {
        "id": "50",
        "nome": "Ponte Persica",
        "lat": 40.730962,
        "long": 14.487809,
        "chilometrica": 25.523
    },
    {
        "id": "51",
        "nome": "Pioppaino",
        "lat": 40.718855,
        "long": 14.491609,
        "chilometrica": 26.902
    },
    {
        "id": "52",
        "nome": "Via Nocera",
        "lat": 40.701168,
        "long": 14.491041,
        "chilometrica": 28.895
    },
    {
        "id": "53",
        "nome": "Castellammare di Stabia",
        "lat": 40.695305,
        "long": 14.483355,
        "chilometrica": 29.861
    },
    {
        "id": "54",
        "nome": "Castellammare Terme",
        "lat": 40.689785,
        "long": 14.46746,
        "chilometrica": 31.381
    },
    {
        "id": "55",
        "nome": "Pozzano",
        "lat": 40.685481,
        "long": 14.455268,
        "chilometrica": 32.518
    },
    {
        "id": "56",
        "nome": "Scrajo",
        "lat": 40.67148,
        "long": 14.436413,
        "chilometrica": 34.92
    },
    {
        "id": "57",
        "nome": "Vico Equense",
        "lat": 40.662921,
        "long": 14.42997,
        "chilometrica": 36.015
    },
    {
        "id": "58",
        "nome": "Seiano",
        "lat": 40.655986,
        "long": 14.426703,
        "chilometrica": 36.837
    },
    {
        "id": "59",
        "nome": "Meta",
        "lat": 40.640169,
        "long": 14.416313,
        "chilometrica": 38.769
    },
    {
        "id": "60",
        "nome": "Piano",
        "lat": 40.634899,
        "long": 14.410347,
        "chilometrica": 39.565
    },
    {
        "id": "61",
        "nome": "S. Agnello",
        "lat": 40.631077,
        "long": 14.397931,
        "chilometrica": 40.701
    },
    {
        "id": "62",
        "nome": "Sorrento",
        "lat": 40.625848,
        "long": 14.379731,
        "chilometrica": 42.388
    },
    {
        "id": "63",
        "nome": "Poggioreale",
        "lat": 40.86661,
        "long": 14.29347,
        "chilometrica": 3.424
    },
    {
        "id": "64",
        "nome": "Botteghelle",
        "lat": 40.87228,
        "long": 14.31565,
        "chilometrica": 5.382
    },
    {
        "id": "90",
        "nome": "Napoli Centro Direzionale",
        "lat": 40.859106,
        "long": 14.281649,
        "chilometrica": 2.05
    },
    {
        "id": "91",
        "nome": "Bartolo Longo",
        "lat": 40.847296,
        "long": 14.336615,
        "chilometrica": 2.127
    },
    {
        "id": "92",
        "nome": "Vesuvio De Meis (SGV)",
        "lat": 40.852529,
        "long": 14.338971,
        "chilometrica": 2.831
    },
    {
        "id": "93",
        "nome": "Villa Visconti",
        "lat": 40.855471,
        "long": 14.338429,
        "chilometrica": 3.232
    },
    {
        "id": "94",
        "nome": "Argine Palasport",
        "lat": 40.86235,
        "long": 14.33829,
        "chilometrica": 3.972
    }
];

/**
 * Find station by ID
 * @param id - EAV station ID
 * @returns Station object or undefined if not found
 */
export function findStationById(id: string): EAVStation | undefined {
    return EAV_STATIONS.find(station => station.id === id);
}

/**
 * Find station by name (case-insensitive)
 * @param name - Station name to search for
 * @returns Station object or undefined if not found
 */
export function findStationByName(name: string): EAVStation | undefined {
    const normalizedName = name.toLowerCase().trim();
    return EAV_STATIONS.find(station =>
        station.nome.toLowerCase().trim() === normalizedName
    );
}

/**
 * Search stations by partial name match (case-insensitive)
 * @param searchTerm - Partial name to search for
 * @returns Array of matching stations
 */
export function searchStationsByName(searchTerm: string): EAVStation[] {
    const normalizedTerm = searchTerm.toLowerCase().trim();
    if (!normalizedTerm) return [];

    return EAV_STATIONS.filter(station =>
        station.nome.toLowerCase().includes(normalizedTerm)
    );
}

/**
 * Get all stations sorted by kilometric distance
 * @returns Array of all stations sorted by distance
 */
export function getAllStationsSorted(): EAVStation[] {
    return [...EAV_STATIONS].sort((a, b) => a.chilometrica - b.chilometrica);
}

/**
 * Get stations between two points on the line
 * @param fromKm - Starting kilometric point
 * @param toKm - Ending kilometric point
 * @returns Array of stations between the two points
 */
export function getStationsBetween(fromKm: number, toKm: number): EAVStation[] {
    const minKm = Math.min(fromKm, toKm);
    const maxKm = Math.max(fromKm, toKm);

    return EAV_STATIONS.filter(station =>
        station.chilometrica >= minKm && station.chilometrica <= maxKm
    ).sort((a, b) => a.chilometrica - b.chilometrica);
}
