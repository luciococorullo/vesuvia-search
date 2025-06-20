/**
 * @fileoverview EAV Destinations API Route
 * 
 * This API endpoint calls the official EAV API to get all reachable destination
 * stations from a given departure station. This is useful for autocomplete
 * functionality and route planning.
 * 
 * Endpoint: POST /api/eav-destinations
 * 
 * Body Parameters:
 * - id: Source station ID (from EAV stations)
 * 
 * @author VesuviaSearch Team
 * @version 1.0.0
 */

import { NextRequest, NextResponse } from 'next/server';
import {
    EAVDestination,
    EAVDestinationsResponse,
    EAVDestinationsParams,
    NormalizedDestination
} from '@/lib/types';
import { findStationById, EAV_STATIONS } from '@/lib/eav-stations';

/**
 * POST handler for EAV destinations requests
 * 
 * Makes a request to the official EAV API to get all stations reachable
 * from the specified departure station.
 * 
 * @param request - Next.js request object with station ID parameter
 * @returns Promise<NextResponse> JSON response with destination stations
 */
export async function POST(request: NextRequest) {
    try {
        // ========================================
        // PARSE AND VALIDATE REQUEST BODY
        // ========================================

        const body: EAVDestinationsParams = await request.json();
        const { id } = body;

        // Validate required parameter
        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Missing required parameter: id'
                },
                { status: 400 }
            );
        }

        // Validate station ID exists
        const station = findStationById(id);
        if (!station) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Invalid station ID: ${id}`
                },
                { status: 400 }
            );
        }

        // ========================================
        // CALL OFFICIAL EAV DESTINATIONS API
        // ========================================

        const eavUrl = 'https://planner.eavsrl.it/Home/DestinazioniFromStazione';

        // Prepare form data as the API expects application/x-www-form-urlencoded
        const formData = new URLSearchParams();
        formData.append('id', id);

        console.log('Calling EAV Destinations API with:', {
            url: eavUrl,
            stationId: id,
            stationName: station.nome
        });

        const eavResponse = await fetch(eavUrl, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.9,it-IT;q=0.8,it;q=0.7',
                'Connection': 'keep-alive',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'DNT': '1',
                'Origin': 'https://planner.eavsrl.it',
                'Referer': 'https://planner.eavsrl.it/',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest',
                'sec-ch-ua': '"Chromium";v="137", "Not/A)Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"'
            },
            body: formData
        });

        console.log('EAV Destinations API Response:', {
            status: eavResponse.status,
            statusText: eavResponse.statusText,
            ok: eavResponse.ok
        });

        if (!eavResponse.ok) {
            const errorText = await eavResponse.text();
            console.error('EAV Destinations API Error Details:', errorText);
            return NextResponse.json(
                {
                    success: false,
                    error: `EAV Destinations API error: ${eavResponse.status} ${eavResponse.statusText}`,
                    details: errorText
                },
                { status: 502 }
            );
        }

        const eavData: EAVDestination[] = await eavResponse.json();

        // ========================================
        // TRANSFORM AND NORMALIZE RESPONSE
        // ========================================

        console.log(`Retrieved ${eavData.length} destinations for station ${station.nome}`);

        // Normalize the destinations and enrich with coordinate data
        const normalizedDestinations: NormalizedDestination[] = eavData.map(dest => {
            // Try to find matching station in our data for coordinates
            const matchingStation = EAV_STATIONS.find(s =>
                s.id === dest.Codice.toString() ||
                s.nome.toLowerCase() === dest.Descrizione.toLowerCase()
            );

            return {
                Id: dest.Codice,
                Nome: dest.Descrizione,
                Lat: matchingStation?.lat,
                Long: matchingStation?.long,
                Chilometrica: matchingStation?.chilometrica
            };
        });

        const response: EAVDestinationsResponse = {
            success: true,
            destinations: normalizedDestinations
        };

        return NextResponse.json(response);

    } catch (error) {
        console.error('Error in EAV destinations API:', error);

        return NextResponse.json(
            {
                success: false,
                error: 'Internal server error',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
