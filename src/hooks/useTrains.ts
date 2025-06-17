import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Station, TrainWithDetails, SearchResult, CreateStation, CreateTrain } from '@/lib/types';

// API functions
const api = {
    // Stations
    getStations: async (): Promise<Station[]> => {
        const response = await fetch('/api/stations');
        if (!response.ok) throw new Error('Failed to fetch stations');
        return response.json();
    },

    createStation: async (data: CreateStation): Promise<Station> => {
        const response = await fetch('/api/stations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create station');
        return response.json();
    },

    // Trains
    getTrains: async (params?: {
        isCampaniaExpress?: boolean;
        category?: string;
        direction?: string;
    }): Promise<TrainWithDetails[]> => {
        const searchParams = new URLSearchParams();
        if (params?.isCampaniaExpress !== undefined) {
            searchParams.set('isCampaniaExpress', params.isCampaniaExpress.toString());
        }
        if (params?.category) searchParams.set('category', params.category);
        if (params?.direction) searchParams.set('direction', params.direction);

        const response = await fetch(`/api/trains?${searchParams}`);
        if (!response.ok) throw new Error('Failed to fetch trains');
        return response.json();
    },

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
