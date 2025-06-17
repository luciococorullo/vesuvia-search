import { z } from 'zod';

// Enums
export const DirectionSchema = z.enum(['NAPOLI', 'SORRENTO']);
export const OperatingDaysSchema = z.enum([
    'WEEKDAYS_ONLY',
    'WEEKENDS_ONLY',
    'DAILY',
    'WEEKDAYS_AND_SATURDAY'
]);
export const TrainCategorySchema = z.enum([
    'REGIONALE',        // DD - Direttissimo
    'INTERCITY',        // D - Diretto
    'CAMPANIA_EXPRESS'  // CE - Campania Express
]);

// Station schemas
export const StationSchema = z.object({
    id: z.number(),
    name: z.string(),
    code: z.string(),
});

export const CreateStationSchema = z.object({
    name: z.string().min(1, 'Nome stazione richiesto'),
    code: z.string().min(2, 'Codice stazione richiesto').max(10),
});

// Train schemas
export const TrainSchema = z.object({
    id: z.number(),
    trainNumber: z.string().nullable(),
    direction: DirectionSchema,
    departureTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato orario non valido (HH:MM)'),
    operatingDays: OperatingDaysSchema,
    isCampaniaExpress: z.boolean(),
    category: TrainCategorySchema,
    startStationId: z.number(),
    endStationId: z.number(),
});

export const CreateTrainSchema = z.object({
    trainNumber: z.string().optional(),
    direction: DirectionSchema,
    departureTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato orario non valido (HH:MM)'),
    operatingDays: OperatingDaysSchema,
    isCampaniaExpress: z.boolean().default(false),
    category: TrainCategorySchema.default('REGIONALE'),
    startStationId: z.number().positive(),
    endStationId: z.number().positive(),
});

// Train stop schemas
export const TrainStopSchema = z.object({
    id: z.number(),
    trainId: z.number(),
    stationId: z.number(),
    arrivalTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).nullable(),
    departureTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).nullable(),
    stopOrder: z.number().positive(),
});

export const CreateTrainStopSchema = z.object({
    stationId: z.number().positive(),
    arrivalTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
    departureTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
    stopOrder: z.number().positive(),
});

// Search schemas
export const TrainSearchSchema = z.object({
    from: z.string().min(1, 'Stazione di partenza richiesta'),
    to: z.string().min(1, 'Stazione di arrivo richiesta'),
    date: z.string().optional(), // YYYY-MM-DD format
    time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
    isCampaniaExpress: z.boolean().optional(),
});

// Types derived from schemas
export type Direction = z.infer<typeof DirectionSchema>;
export type OperatingDays = z.infer<typeof OperatingDaysSchema>;
export type TrainCategory = z.infer<typeof TrainCategorySchema>;
export type Station = z.infer<typeof StationSchema>;
export type CreateStation = z.infer<typeof CreateStationSchema>;
export type Train = z.infer<typeof TrainSchema>;
export type CreateTrain = z.infer<typeof CreateTrainSchema>;
export type TrainStop = z.infer<typeof TrainStopSchema>;
export type CreateTrainStop = z.infer<typeof CreateTrainStopSchema>;
export type TrainSearch = z.infer<typeof TrainSearchSchema>;

// Extended types for API responses
export type TrainWithDetails = Train & {
    startStation: Station;
    endStation: Station;
    stops: (TrainStop & { station: Station })[];
};

export type SearchResult = {
    trains: TrainWithDetails[];
    totalResults: number;
    searchCriteria?: TrainSearch;
    fromStations?: Station[];
    toStations?: Station[];
};

// Helper functions for operating days
export const getOperatingDaysLabel = (operatingDays: OperatingDays): string => {
    const labels: Record<OperatingDays, string> = {
        'WEEKDAYS_ONLY': 'Solo feriali',
        'WEEKENDS_ONLY': 'Solo festivi',
        'DAILY': 'Tutti i giorni',
        'WEEKDAYS_AND_SATURDAY': 'Feriali e sabato'
    };
    return labels[operatingDays];
};

export const getCategoryLabel = (category: TrainCategory): string => {
    const labels: Record<TrainCategory, string> = {
        'REGIONALE': 'Direttissimo (DD)',
        'INTERCITY': 'Diretto (D)',
        'CAMPANIA_EXPRESS': 'Campania Express'
    };
    return labels[category];
};

export const getDirectionLabel = (direction: Direction): string => {
    return direction === 'NAPOLI' ? 'Napoli' : 'Sorrento';
};
