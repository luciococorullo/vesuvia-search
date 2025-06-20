/**
 * @fileoverview Custom React hooks for EAV API integration
 * 
 * This file contains React Query hooks for managing train searches using the
 * official EAV API. It replaces the database-based approach with real-time
 * data from the official Circumvesuviana service.
 * 
 * Features:
 * - Real-time train schedule search
 * - EAV station management
 * - Proper error handling with user-friendly messages
 * - TypeScript support with EAV API types
 * 
 * @author VesuviaSearch Team
 * @version 2.0.0
 */

import { useMutation } from '@tanstack/react-query';
import {
    EAVTrainResult,
    EAVSearchParams,
    formatDateForEAV,
    formatTimeForEAV,
    NormalizedDestination
} from '@/lib/types';
import { EAV_STATIONS, findStationByName } from '@/lib/eav-stations';

// Re-export destinations hook for convenience
export { useEAVDestinations } from './useEAVDestinations';

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

/**
 * Standardized API response structure for EAV searches
 */
export interface EAVSearchResponse {
    success: boolean;
    trains: EAVTrainResult[];
    originStation?: string;
    destinationStation?: string;
    searchDate?: string;
    searchTime?: string;
    message?: string;
    error?: string;
    details?: string;
}

/**
 * Search parameters for the EAV API hook
 */
export interface EAVSearchRequest {
    fromStation: string;      // Station name
    toStation: string;        // Station name  
    date: Date;              // Travel date
    time: Date;              // Travel time
}

// ============================================================================
// API FUNCTIONS
// ============================================================================

/**
 * Collection of EAV API functions
 */
const eavApi = {
    /**
     * Search trains using the official EAV API
     * @param params Search parameters
     * @returns Promise<EAVSearchResponse> Search results
     */
    searchTrains: async (params: EAVSearchRequest): Promise<EAVSearchResponse> => {
        try {
            // Find station IDs by name
            const originStation = findStationByName(params.fromStation);
            const destinationStation = findStationByName(params.toStation);

            if (!originStation) {
                throw new Error(`Station not found: ${params.fromStation}`);
            }

            if (!destinationStation) {
                throw new Error(`Station not found: ${params.toStation}`);
            }

            // Prepare search parameters for EAV API
            const searchParams: EAVSearchParams = {
                origine: originStation.id,
                destinazione: destinationStation.id,
                data: formatDateForEAV(params.date),
                ora: formatTimeForEAV(params.time)
            };

            // Call our API route that proxies to EAV
            const response = await fetch('/api/eav-search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(searchParams),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
            }

            const result: EAVSearchResponse = await response.json();
            return result;

        } catch (error) {
            console.error('EAV API Search Error:', error);

            // Return a structured error response
            return {
                success: false,
                trains: [],
                error: error instanceof Error ? error.message : 'Unknown error occurred',
                message: 'searchError'
            };
        }
    }
};

// ============================================================================
// REACT HOOKS
// ============================================================================

/**
 * Hook for getting all EAV stations
 * @returns Array of EAV stations (static data, no API call needed)
 */
export const useEAVStations = () => {
    return {
        data: EAV_STATIONS,
        isLoading: false,
        isError: false,
        error: null
    };
};

/**
 * Hook for manual train search using EAV API
 * Use this when you want to trigger searches manually (e.g., on button click)
 * 
 * @returns Mutation object with search function and state
 */
export const useEAVSearchTrainsMutation = () => {
    return useMutation({
        mutationFn: eavApi.searchTrains,
        onError: (error) => {
            console.error('EAV Search Mutation Error:', error);
        },
    });
};

/**
 * Helper hook to get stations formatted for autocomplete
 * Converts EAV stations to the format expected by StationAutocomplete component
 */
export const useEAVStationsForAutocomplete = () => {
    const stations = EAV_STATIONS.map(station => ({
        id: station.id,
        name: station.nome,
        code: station.id, // Use ID as code for now
        lat: station.lat,
        long: station.long
    }));

    return {
        data: stations,
        isLoading: false,
        isError: false,
        error: null
    };
};

/**
 * Helper hook to get EAV stations adapted for the existing StationAutocomplete component
 * Converts EAV stations to match the Station interface expected by StationAutocomplete
 */
export const useEAVStationsForStationAutocomplete = () => {
    const stations = EAV_STATIONS.map(station => ({
        id: parseInt(station.id), // Convert string ID to number
        name: station.nome,
        code: station.id, // Use ID as code
    }));

    return {
        data: stations,
        isLoading: false,
        isError: false,
        error: null
    };
};

/**
 * Helper hook to get destination stations for autocomplete based on departure station
 * Converts destination stations to match the Station interface expected by StationAutocomplete
 */
export const useDestinationStationsForAutocomplete = (destinations: NormalizedDestination[]) => {
    const stations = destinations.map(dest => ({
        id: dest.Id,
        name: dest.Nome,
        code: dest.Id.toString(), // Use ID as code
    }));

    return {
        data: stations,
        isLoading: false,
        isError: false,
        error: null
    };
};

/**
 * Utility function to validate if a station name exists
 * @param stationName - Name of the station to validate
 * @returns boolean indicating if station exists
 */
export const validateStationName = (stationName: string): boolean => {
    return findStationByName(stationName) !== undefined;
};

/**
 * Utility function to get station suggestions for autocomplete
 * @param searchTerm - Partial station name
 * @returns Array of matching station names
 */
export const getStationSuggestions = (searchTerm: string): string[] => {
    if (!searchTerm || searchTerm.length < 2) return [];

    const normalizedTerm = searchTerm.toLowerCase().trim();
    return EAV_STATIONS
        .filter(station =>
            station.nome.toLowerCase().includes(normalizedTerm)
        )
        .map(station => station.nome)
        .slice(0, 10); // Limit to 10 suggestions
};

// ============================================================================
// DEPARTURES API TYPES
// ============================================================================

/**
 * Departure/Arrival result from EAV departures API
 */
export interface EAVDepartureResult {
    id: string;
    trainNumber: string;
    destination: string;
    time: string;
    delay?: string;
    platform?: string;
    trainType?: string;
    status?: string;
}

/**
 * EAV Departures API response structure
 */
export interface EAVDeparturesResponse {
    success: boolean;
    trains: EAVDepartureResult[];
    station?: string;
    stationId?: string;
    type?: 'arrivals' | 'departures';
    error?: string;
    message?: string;
}

/**
 * Parameters for departures search
 */
export interface EAVDeparturesRequest {
    stationName: string;
    type?: 'arrivals' | 'departures';
}

// ============================================================================
// DEPARTURES HOOKS
// ============================================================================

/**
 * Hook for searching departures/arrivals from a specific station
 * 
 * @returns React Query mutation for departures search
 */
export const useEAVDeparturesMutation = () => {
    return useMutation<EAVDeparturesResponse, Error, EAVDeparturesRequest>({
        mutationFn: async ({ stationName, type = 'departures' }: EAVDeparturesRequest) => {
            // Find station by name to get the ID
            const station = findStationByName(stationName);
            if (!station) {
                throw new Error(`Station not found: ${stationName}`);
            }

            const requestBody = {
                stazione: station.id,
                tipo: type === 'arrivals' ? 'A' : 'P'
            };

            console.log('Calling EAV departures API with:', requestBody);

            const response = await fetch('/api/eav-departures', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const data: EAVDeparturesResponse = await response.json();

            if (!data.success) {
                throw new Error(data.error || 'API request failed');
            }

            return data;
        },
    });
};
