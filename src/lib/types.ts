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
// EAV API TYPES
// ============================================================================

/**
 * Raw date format returned by EAV API
 * Format: "/Date(1750364940000)/"
 */
export interface EAVDate {
    date: string;
}

/**
 * Single journey/route segment in EAV API response
 */
export interface EAVPercorso {
    ExtensionData: Record<string, unknown>;
    DLinea: string;
    Descrizione_destinazione: string;
    Descrizione_origine: string;
    Destinazione_corsa: string;
    Linea: string;
    Origine_corsa: string;
    arrivo: string; // "/Date(timestamp)/" format
    arrivoDestinazione: string;
    bitmask: string;
    codice: number;
    destinazione: number;
    origine: number;
    partenza: string; // "/Date(timestamp)/" format
    partenzaOrigine: string;
    progressivo: number | null;
    ritardo: number;
    soppressa: boolean;
    tipologia: string; // "DD", "D", etc.
}

/**
 * Single journey in EAV API response
 */
export interface EAVCorsa {
    ExtensionData: Record<string, unknown>;
    Descrizione_destinazione: string;
    Descrizione_origine: string;
    Destinazione_corsa: string;
    Origine_corsa: string;
    arrivo: string; // "/Date(timestamp)/" format
    destinazione: number;
    origine: number;
    partenza: string; // "/Date(timestamp)/" format
    percorsi: EAVPercorso[];
}

/**
 * Complete EAV API response structure
 */
export interface EAVApiResponse {
    CorsePercorso: EAVCorsa[];
    media_origine: number[];
    media_destinazione: number[];
    Liv_Min_origine: number;
    Liv_Max_origine: number;
    Liv_Min_destinazione: number;
    Liv_Max_destinazione: number;
    Origine_disabilitata: boolean;
    Destinazione_disabilitata: boolean;
    Descr_Origine_disabilitata: string | null;
    Descr_Destinazione_disabilitata: string | null;
}

/**
 * Simplified train result for our app
 */
export interface EAVTrainResult {
    id: string;
    trainCode: number;
    departureTime: string; // ISO string format for JSON serialization
    arrivalTime: string; // ISO string format for JSON serialization
    departureStation: string;
    arrivalStation: string;
    trainType: string;
    isDelayed: boolean;
    delaMinutes: number;
    isCancelled: boolean;
    line: string;
}

/**
 * EAV search parameters
 */
export interface EAVSearchParams {
    origine: string; // Station ID
    destinazione: string; // Station ID
    data: string; // Format: "DD/MM/YYYY"
    ora: string; // Format: "HH:MM"
}

/**
 * Utility function to parse EAV date format
 * Converts "/Date(1750364940000)/" to JavaScript Date
 */
export function parseEAVDate(eavDate: string): Date {
    const match = eavDate.match(/\/Date\((-?\d+)\)\//);
    if (!match) {
        throw new Error(`Invalid EAV date format: ${eavDate}`);
    }
    return new Date(parseInt(match[1], 10));
}

/**
 * Utility function to format date for EAV API
 * Converts JavaScript Date to "DD/MM/YYYY" format
 */
export function formatDateForEAV(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

/**
 * Utility function to format time for EAV API
 * Converts JavaScript Date to "HH:MM" format
 */
export function formatTimeForEAV(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}
