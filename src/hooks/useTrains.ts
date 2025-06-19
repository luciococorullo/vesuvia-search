/**
 * @fileoverview Custom React hooks for train data management
 * 
 * This file contains React Query hooks for managing train, station, and search
 * data throughout the VesuviaSearch application. It provides a centralized
 * interface for all API calls with caching, loading states, and error handling.
 * 
 * Features:
 * - Station management (fetch, create)
 * - Train management (fetch, create, search)
 * - Search functionality (routes, departures)
 * - Optimistic updates and cache invalidation
 * - TypeScript support with proper typing
 * 
 * @author VesuviaSearch Team
 * @version 1.0.0
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Station, TrainWithDetails, SearchResult, CreateStation, CreateTrain } from '@/lib/types';

// ============================================================================
// API FUNCTIONS
// ============================================================================

/**
 * Collection of API functions for server communication
 * These functions handle HTTP requests and response parsing
 */
const api = {
    // ========================================
    // STATION API FUNCTIONS
    // ========================================

    /**
     * Fetch all railway stations
     * @returns Promise<Station[]> Array of all stations
     */
    getStations: async (): Promise<Station[]> => {
        const response = await fetch('/api/stations');
        if (!response.ok) throw new Error('Failed to fetch stations');
        return response.json();
    },

    /**
     * Create a new railway station
     * @param data Station creation data
     * @returns Promise<Station> Created station
     */
    createStation: async (data: CreateStation): Promise<Station> => {
        const response = await fetch('/api/stations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create station');
        return response.json();
    },

    // ========================================
    // TRAIN API FUNCTIONS
    // ========================================

    /**
     * Fetch trains with optional filtering
     * @param params Optional filter parameters
     * @returns Promise<TrainWithDetails[]> Array of trains with full details
     */
    getTrains: async (params?: {
        isCampaniaExpress?: boolean;
        category?: string;
        direction?: string;
    }): Promise<TrainWithDetails[]> => {
        const searchParams = new URLSearchParams();

        // Build query parameters
        if (params?.isCampaniaExpress !== undefined) {
            searchParams.set('isCampaniaExpress', params.isCampaniaExpress.toString());
        }
        if (params?.category) searchParams.set('category', params.category);
        if (params?.direction) searchParams.set('direction', params.direction);

        const response = await fetch(`/api/trains?${searchParams}`);
        if (!response.ok) throw new Error('Failed to fetch trains');
        return response.json();
    },

    /**
     * Create a new train schedule
     * @param data Train creation data
     * @returns Promise<TrainWithDetails> Created train with details
     */
    createTrain: async (data: CreateTrain): Promise<TrainWithDetails> => {
        const response = await fetch('/api/trains', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create train');
        return response.json();
    },

    // Search
    searchTrains: async (params: {
        from: string;
        to: string;
        date?: string;
        time?: string;
        isCampaniaExpress?: boolean;
    }): Promise<SearchResult> => {
        const searchParams = new URLSearchParams();
        searchParams.set('from', params.from);
        searchParams.set('to', params.to);
        if (params.date) searchParams.set('date', params.date);
        if (params.time) searchParams.set('time', params.time);
        if (params.isCampaniaExpress === true) {
            searchParams.set('isCampaniaExpress', 'true');
        }

        const response = await fetch(`/api/search?${searchParams}`);
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error:', response.status, errorText);
            throw new Error(`Failed to search trains: ${response.status} ${errorText}`);
        }
        return response.json();
    },

    // Departures
    searchDepartures: async (params: {
        from: string;
        date?: string;
        time?: string;
        isCampaniaExpress?: boolean;
    }): Promise<SearchResult> => {
        const searchParams = new URLSearchParams();
        searchParams.set('from', params.from);
        if (params.date) searchParams.set('date', params.date);
        if (params.time) searchParams.set('time', params.time);
        if (params.isCampaniaExpress === true) {
            searchParams.set('isCampaniaExpress', 'true');
        }

        const response = await fetch(`/api/departures?${searchParams}`);
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error:', response.status, errorText);
            throw new Error(`Failed to search departures: ${response.status} ${errorText}`);
        }
        return response.json();
    },
};

// Hooks
export const useStations = () => {
    return useQuery({
        queryKey: ['stations'],
        queryFn: api.getStations,
    });
};

export const useCreateStation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: api.createStation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stations'] });
        },
    });
};

export const useTrains = (params?: {
    isCampaniaExpress?: boolean;
    category?: string;
    direction?: string;
}) => {
    return useQuery({
        queryKey: ['trains', params],
        queryFn: () => api.getTrains(params),
    });
};

export const useCreateTrain = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: api.createTrain,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trains'] });
        },
    });
};

export const useSearchTrains = (params: {
    from: string;
    to: string;
    date?: string;
    time?: string;
    isCampaniaExpress?: boolean;
}, enabled: boolean = true) => {
    return useQuery({
        queryKey: ['search', params],
        queryFn: () => api.searchTrains(params),
        enabled: enabled && params.from.length > 0 && params.to.length > 0,
    });
};

// Hook per la ricerca manuale (senza auto-fetch)
export const useSearchTrainsMutation = () => {
    return useMutation({
        mutationFn: api.searchTrains,
    });
};

// Hook per la ricerca delle partenze
export const useSearchDeparturesMutation = () => {
    return useMutation({
        mutationFn: api.searchDepartures,
    });
};
