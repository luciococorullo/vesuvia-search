/**
 * @fileoverview Custom React hook for EAV destinations API
 * 
 * This file contains a React Query hook for retrieving all destination stations
 * reachable from a given departure station using the official EAV API.
 * 
 * Features:
 * - Get all reachable destinations from a station
 * - Proper error handling with user-friendly messages
 * - TypeScript support with EAV API types
 * - React Query caching and state management
 * 
 * @author VesuviaSearch Team
 * @version 1.0.0
 */

import { useMutation, useQuery } from '@tanstack/react-query';
import {
    EAVDestinationsResponse,
    EAVDestinationsParams,
    NormalizedDestination
} from '@/lib/types';
import { findStationById, EAVStation } from '@/lib/eav-stations';

// ============================================================================
// HOOK FOR GETTING DESTINATIONS FROM A STATION
// ============================================================================

/**
 * Hook to get all destination stations reachable from a given station
 * 
 * @param stationId - The ID of the departure station
 * @param enabled - Whether the query should run automatically
 * @returns React Query result with destinations data
 */
export function useEAVDestinations(stationId?: string, enabled: boolean = true) {
    return useQuery({
        queryKey: ['eav-destinations', stationId],
        queryFn: async (): Promise<EAVDestinationsResponse> => {
            if (!stationId) {
                throw new Error('Station ID is required');
            }

            const response = await fetch('/api/eav-destinations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: stationId }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            return response.json();
        },
        enabled: enabled && !!stationId,
        staleTime: 5 * 60 * 1000, // 5 minutes - destinations don't change often
        gcTime: 30 * 60 * 1000, // 30 minutes in cache
        retry: 2,
    });
}

/**
 * Mutation hook to fetch destinations for a station on demand
 * 
 * @returns React Query mutation for fetching destinations
 */
export function useEAVDestinationsMutation() {
    return useMutation({
        mutationFn: async (params: EAVDestinationsParams): Promise<EAVDestinationsResponse> => {
            const response = await fetch('/api/eav-destinations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            return response.json();
        },
        retry: 2,
    });
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get station information by ID
 * 
 * @param stationId - The station ID to look up
 * @returns Station information or null if not found
 */
export function getStationInfo(stationId: string): EAVStation | null {
    return findStationById(stationId) || null;
}

/**
 * Check if a destination is reachable from a source station
 * 
 * @param sourceStationId - The source station ID
 * @param destinationStationId - The destination station ID
 * @returns Promise that resolves to true if destination is reachable
 */
export async function isDestinationReachable(
    sourceStationId: string,
    destinationStationId: string
): Promise<boolean> {
    try {
        const response = await fetch('/api/eav-destinations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: sourceStationId }),
        });

        if (!response.ok) {
            return false;
        }

        const data: EAVDestinationsResponse = await response.json();

        if (!data.success) {
            return false;
        }

        return data.destinations.some(dest => dest.Id.toString() === destinationStationId);
    } catch (error) {
        console.error('Error checking destination reachability:', error);
        return false;
    }
}

/**
 * Get destinations as a formatted list suitable for autocomplete
 * 
 * @param destinations - Array of normalized destinations
 * @returns Formatted array suitable for autocomplete components
 */
export function formatDestinationsForAutocomplete(destinations: NormalizedDestination[]) {
    return destinations.map(dest => ({
        id: dest.Id.toString(),
        name: dest.Nome,
        value: dest.Nome,
        coordinates: dest.Lat && dest.Long ? {
            lat: dest.Lat,
            lng: dest.Long
        } : undefined,
        distance: dest.Chilometrica
    }));
}
