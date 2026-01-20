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
        "id": "7",
        "nome": "Ponticelli",
        "lat": 40.851023,
        "long": 14.333336,
        "chilometrica": 0
    },
    {
        "id": "8",
        "nome": "Cercola",
        "lat": 40.856301,
        "long": 14.355284,
        "chilometrica": 0
    },
    {
        "id": "9",
        "nome": "Pollena Trocchia",
        "lat": 40.859843,
        "long": 14.380188,
        "chilometrica": 0
    },
    {
        "id": "12",
        "nome": "S. Anastasia",
        "lat": 40.870059,
        "long": 14.400303,
        "chilometrica": 0
    },
    {
        "id": "14",
        "nome": "Somma Vesuviana",
        "lat": 40.874074,
        "long": 14.438364,
        "chilometrica": 0
    },
    {
        "id": "16",
        "nome": "Ottaviano",
        "lat": 40.852868,
        "long": 14.480637,
        "chilometrica": 0
    },
    {
        "id": "18",
        "nome": "S. Giuseppe",
        "lat": 40.837373,
        "long": 14.501191,
        "chilometrica": 0
    },
    {
        "id": "20",
        "nome": "Terzigno",
        "lat": 40.814159,
        "long": 14.497272,
        "chilometrica": 0
    },
    {
        "id": "22",
        "nome": "Poggiomarino",
        "lat": 40.800957,
        "long": 14.540077,
        "chilometrica": 0
    },
    {
        "id": "23",
        "nome": "Striano",
        "lat": 40.811906,
        "long": 14.577021,
        "chilometrica": 0
    },
    {
        "id": "24",
        "nome": "S. Valentino Torio",
        "lat": 40.797129,
        "long": 14.600155,
        "chilometrica": 0
    },
    {
        "id": "25",
        "nome": "Sarno",
        "lat": 40.812210,
        "long": 14.618466,
        "chilometrica": 0
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
        "nome": "Stabia Scavi",
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
    },
    {
        "id": "42",
        "nome": "Boscotrecase",
        "lat": 40.768640,
        "long": 14.461099,
        "chilometrica": 0
    },
    {
        "id": "45",
        "nome": "Pompei Santuario",
        "lat": 40.751134,
        "long": 14.501608,
        "chilometrica": 0
    },
    {
        "id": "46",
        "nome": "Scafati",
        "lat": 40.753598,
        "long": 14.524419,
        "chilometrica": 0
    },
    {
        "id": "66",
        "nome": "Casalnuovo",
        "lat": 40.907802,
        "long": 14.347487,
        "chilometrica": 0
    },
    {
        "id": "69",
        "nome": "Pomigliano d'Arco",
        "lat": 40.914691,
        "long": 14.393016,
        "chilometrica": 0
    },
    {
        "id": "70",
        "nome": "Casoria Arpino - Volla",
        "lat": 40.888150,
        "long": 14.329680,
        "chilometrica": 0
    },
    {
        "id": "73",
        "nome": "Via Vittorio Veneto",
        "lat": 40.919475,
        "long": 14.442251,
        "chilometrica": 0
    },
    {
        "id": "76",
        "nome": "Scisciano",
        "lat": 40.912661,
        "long": 14.480314,
        "chilometrica": 0
    },
    {
        "id": "77",
        "nome": "Saviano",
        "lat": 40.912176,
        "long": 14.509323,
        "chilometrica": 0
    },
    {
        "id": "78",
        "nome": "Nola",
        "lat": 40.929364,
        "long": 14.526792,
        "chilometrica": 0
    },
    {
        "id": "79",
        "nome": "Cimitile",
        "lat": 40.939130,
        "long": 14.530495,
        "chilometrica": 0
    },
    {
        "id": "81",
        "nome": "Cicciano",
        "lat": 40.960562,
        "long": 14.543252,
        "chilometrica": 0
    },
    {
        "id": "82",
        "nome": "Roccarainola",
        "lat": 40.966367,
        "long": 14.560060,
        "chilometrica": 0
    },
    {
        "id": "84",
        "nome": "Baiano",
        "lat": 40.952895,
        "long": 14.616973,
        "chilometrica": 0
    },
    {
        "id": "86",
        "nome": "Alfa Lancia Varco 4",
        "lat": 40.930254,
        "long": 14.399977,
        "chilometrica": 0
    },
    {
        "id": "96",
        "nome": "Madonnelle",
        "lat": 40.871179,
        "long": 14.334486,
        "chilometrica": 5.037
    },
    {
        "id": "98",
        "nome": "Acerra",
        "lat": 40.947300,
        "long": 14.382543,
        "chilometrica": 0
    },
    {
        "id": "107",
        "nome": "Pozzuoli",
        "lat": 40.824780,
        "long": 14.121430,
        "chilometrica": 0
    },
    {
        "id": "109",
        "nome": "Quarto",
        "lat": 40.880240,
        "long": 14.136240,
        "chilometrica": 0
    },
    {
        "id": "112",
        "nome": "Aversa",
        "lat": 40.974147,
        "long": 14.213685,
        "chilometrica": 0
    },
    {
        "id": "124",
        "nome": "Giugliano",
        "lat": 40.927877,
        "long": 14.217663,
        "chilometrica": 0
    },
    {
        "id": "161",
        "nome": "San Felice a Cancello",
        "lat": 41.013724,
        "long": 14.478115,
        "chilometrica": 0
    },
    {
        "id": "174",
        "nome": "Arpaia Airola S. Agata",
        "lat": 41.040081,
        "long": 14.554989,
        "chilometrica": 0
    },
    {
        "id": "214",
        "nome": "S. Maria a Vico",
        "lat": 41.028460,
        "long": 14.462703,
        "chilometrica": 0
    },
    {
        "id": "229",
        "nome": "Alvignano",
        "lat": 41.247010,
        "long": 14.338036,
        "chilometrica": 0
    },
    {
        "id": "238",
        "nome": "Caiazzo",
        "lat": 41.179723,
        "long": 14.364157,
        "chilometrica": 0
    },
    {
        "id": "245",
        "nome": "Cervinara",
        "lat": 41.028690,
        "long": 14.616964,
        "chilometrica": 0
    },
    {
        "id": "278",
        "nome": "Piana di Monte Verna",
        "lat": 41.169866,
        "long": 14.328311,
        "chilometrica": 0
    },
    {
        "id": "293",
        "nome": "S. Martino V.C. Montes. Pann",
        "lat": 41.036679,
        "long": 14.653744,
        "chilometrica": 0
    },
    {
        "id": "301",
        "nome": "Alife",
        "lat": 41.323540,
        "long": 14.339274,
        "chilometrica": 0
    },
    {
        "id": "308",
        "nome": "Benevento RFI",
        "lat": 41.141910,
        "long": 14.769617,
        "chilometrica": 0
    },
    {
        "id": "323",
        "nome": "Dragoni",
        "lat": 41.271154,
        "long": 14.313066,
        "chilometrica": 0
    },
    {
        "id": "430",
        "nome": "Piedimonte Matese",
        "lat": 41.351067,
        "long": 14.367954,
        "chilometrica": 0
    },
    {
        "id": "701",
        "nome": "Napoli Centrale RFI",
        "lat": 40.852469,
        "long": 14.272186,
        "chilometrica": 0
    },
    {
        "id": "703",
        "nome": "S. Angelo in Formis",
        "lat": 41.120232,
        "long": 14.248423,
        "chilometrica": 0
    },
    {
        "id": "707",
        "nome": "Tufara V. Arpaise Ceppaloni",
        "lat": 41.061514,
        "long": 14.706117,
        "chilometrica": 0
    },
    {
        "id": "710",
        "nome": "Benevento Appia",
        "lat": 41.133178,
        "long": 14.766296,
        "chilometrica": 0
    },
    {
        "id": "711",
        "nome": "Piscinola Scampia",
        "lat": 40.892929,
        "long": 14.239837,
        "chilometrica": 0
    },
    {
        "id": "715",
        "nome": "Cancello RFI",
        "lat": 40.994288,
        "long": 14.419593,
        "chilometrica": 0
    },
    {
        "id": "716",
        "nome": "Maddaloni Inferiore RFI",
        "lat": 41.035973,
        "long": 14.380607,
        "chilometrica": 0
    },
    {
        "id": "717",
        "nome": "Caserta RFI",
        "lat": 41.068809,
        "long": 14.328269,
        "chilometrica": 0
    },
    {
        "id": "718",
        "nome": "S. Maria Capua Vetere RFI",
        "lat": 41.073549,
        "long": 14.254141,
        "chilometrica": 0
    },
    {
        "id": "720",
        "nome": "Pontelatone",
        "lat": 41.145241,
        "long": 14.273547,
        "chilometrica": 0
    },
    {
        "id": "801",
        "nome": "Montesanto",
        "lat": 40.847050,
        "long": 14.245330,
        "chilometrica": 0
    },
    {
        "id": "803",
        "nome": "Fuorigrotta",
        "lat": 40.828010,
        "long": 14.201640,
        "chilometrica": 0
    },
    {
        "id": "808",
        "nome": "Bagnoli",
        "lat": 40.815180,
        "long": 14.166820,
        "chilometrica": 0
    },
    {
        "id": "811",
        "nome": "Gerolomini",
        "lat": 40.820650,
        "long": 14.135300,
        "chilometrica": 0
    },
    {
        "id": "814",
        "nome": "Cantieri",
        "lat": 40.832010,
        "long": 14.111670,
        "chilometrica": 0
    },
    {
        "id": "818",
        "nome": "Fusaro",
        "lat": 40.818650,
        "long": 14.061730,
        "chilometrica": 0
    },
    {
        "id": "819",
        "nome": "Torregaveta",
        "lat": 40.811640,
        "long": 14.045260,
        "chilometrica": 0
    },
    {
        "id": "821",
        "nome": "Soccavo",
        "lat": 40.843910,
        "long": 14.200910,
        "chilometrica": 0
    },
    {
        "id": "824",
        "nome": "Pianura",
        "lat": 40.856010,
        "long": 14.162810,
        "chilometrica": 0
    },
    {
        "id": "830",
        "nome": "Licola",
        "lat": 40.871480,
        "long": 14.058850,
        "chilometrica": 0
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
