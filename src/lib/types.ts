/**
 * @fileoverview Type definitions and Zod schemas for the VesuviaSearch application
 * 
 * This file contains all TypeScript types and Zod validation schemas used throughout
 * the application for type safety and runtime validation. It includes schemas for
 * stations, trains, train stops, and search functionality.
 * 
 * @author VesuviaSearch Team
 * @version 1.0.0
 */

import { z } from 'zod';

// ============================================================================
// ENUMS AND CORE SCHEMAS
// ============================================================================

/**
 * Direction enum for train routes between Naples and Sorrento
 */
export const DirectionSchema = z.enum(['NAPOLI', 'SORRENTO']);
/**
 * Operating days enum for train schedules
 * Defines when trains operate (weekdays, weekends, daily, etc.)
 */
export const OperatingDaysSchema = z.enum([
    'WEEKDAYS_ONLY',        // Monday to Friday only
    'WEEKENDS_ONLY',        // Saturday and Sunday only
    'DAILY',                // Every day
    'WEEKDAYS_AND_SATURDAY' // Monday to Saturday
]);

/**
 * Train category enum for different types of Circumvesuviana trains
 * - REGIONALE: Standard regional trains (formerly DD - Direttissimo)
 * - INTERCITY: Direct trains with fewer stops (D - Diretto)
 * - CAMPANIA_EXPRESS: Premium express service for tourists
 */
export const TrainCategorySchema = z.enum([
    'REGIONALE',        // DD - Direttissimo
    'INTERCITY',        // D - Diretto
    'CAMPANIA_EXPRESS'  // CE - Campania Express
]);

// ============================================================================
// STATION SCHEMAS
// ============================================================================

/**
 * Station schema for railway stations on the Circumvesuviana network
 */
export const StationSchema = z.object({
    id: z.number(),
    name: z.string(),
    code: z.string(),
});

/**
 * Schema for creating new stations
 */
export const CreateStationSchema = z.object({
    name: z.string().min(1, 'Nome stazione richiesto'),
    code: z.string().min(2, 'Codice stazione richiesto').max(10),
});

// ============================================================================
// TRAIN SCHEMAS
// ============================================================================

/**
 * Train schema for train schedules and information
 */
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

/**
 * Schema for creating new trains
 */
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

// ============================================================================
// TRAIN STOP SCHEMAS
// ============================================================================

/**
 * Train stop schema for intermediate stations on a train route
 */
export const TrainStopSchema = z.object({
    id: z.number(),
    trainId: z.number(),
    stationId: z.number(),
    arrivalTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).nullable(),
    departureTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).nullable(),
    stopOrder: z.number().positive(),
});

/**
 * Schema for creating new train stops
 */
export const CreateTrainStopSchema = z.object({
    stationId: z.number().positive(),
    arrivalTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
    departureTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
    stopOrder: z.number().positive(),
});

// ============================================================================
// SEARCH SCHEMAS
// ============================================================================

/**
 * Train search schema for search functionality
 */
export const TrainSearchSchema = z.object({
    from: z.string().min(1, 'Stazione di partenza richiesta'),
    to: z.string().min(1, 'Stazione di arrivo richiesta'),
    date: z.string().optional(), // YYYY-MM-DD format
    time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
    isCampaniaExpress: z.boolean().optional(),
});

// ============================================================================
// TYPE INFERENCE
// ============================================================================

/**
 * TypeScript types derived from Zod schemas for type safety
 */
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

// ============================================================================
// EXTENDED TYPES FOR API RESPONSES
// ============================================================================

/**
 * Extended train type with related station and stop information
 * Used for API responses that include full train details
 */
export type TrainWithDetails = Train & {
    startStation: Station;
    endStation: Station;
    stops: (TrainStop & { station: Station })[];
};

/**
 * Search result type for train search API responses
 */
export type SearchResult = {
    trains: TrainWithDetails[];
    totalResults: number;
    searchCriteria?: TrainSearch;
    fromStations?: Station[];
    toStations?: Station[];
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get human-readable label for operating days
 * @param operatingDays - The operating days enum value
 * @returns Localized Italian label for operating days
 */
export const getOperatingDaysLabel = (operatingDays: OperatingDays): string => {
    const labels: Record<OperatingDays, string> = {
        'WEEKDAYS_ONLY': 'Solo feriali',
        'WEEKENDS_ONLY': 'Solo festivi',
        'DAILY': 'Tutti i giorni',
        'WEEKDAYS_AND_SATURDAY': 'Feriali e sabato'
    };
    return labels[operatingDays];
};

/**
 * Get human-readable label for train categories
 * @param category - The train category enum value
 * @returns Localized Italian label for train category
 */
export const getCategoryLabel = (category: TrainCategory): string => {
    const labels: Record<TrainCategory, string> = {
        'REGIONALE': 'Direttissimo (DD)',
        'INTERCITY': 'Diretto (D)',
        'CAMPANIA_EXPRESS': 'Campania Express'
    };
    return labels[category];
};

/**
 * Get human-readable label for train direction
 * @param direction - The direction enum value
 * @returns Localized Italian label for direction
 */
export const getDirectionLabel = (direction: Direction): string => {
    return direction === 'NAPOLI' ? 'Napoli' : 'Sorrento';
};
