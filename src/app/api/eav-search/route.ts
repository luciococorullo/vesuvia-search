/**
 * @fileoverview EAV Official API Route
 * 
 * This API endpoint calls the official EAV train planner API to get real-time
 * train schedules between stations. It replaces the database-based approach
 * with direct calls to the official EAV service.
 * 
 * Endpoint: POST /api/eav-search
 * 
 * Body Parameters:
 * - origine: Source station ID (from EAV stations)
 * - destinazione: Destination station ID (from EAV stations)
 * - data: Travel date (DD/MM/YYYY format)
 * - ora: Departure time (HH:MM format)
 * 
 * @author VesuviaSearch Team
 * @version 1.0.0
 */

import { NextRequest, NextResponse } from 'next/server';
import {
    EAVApiResponse,
    EAVTrainResult,
    parseEAVDate,
    EAVSearchParams
} from '@/lib/types';
import { findStationById } from '@/lib/eav-stations';

/**
 * POST handler for EAV train search requests
 * 
 * Makes a request to the official EAV API and transforms the response
 * into a format suitable for our application.
 * 
 * @param request - Next.js request object with search parameters
 * @returns Promise<NextResponse> JSON response with train results
 */
export async function POST(request: NextRequest) {
    try {
        // ========================================
        // PARSE AND VALIDATE REQUEST BODY
        // ========================================

        const body: EAVSearchParams = await request.json();
        const { origine, destinazione, data, ora } = body;

        // Validate required parameters
        if (!origine || !destinazione || !data || !ora) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Missing required parameters: origine, destinazione, data, ora'
                },
                { status: 400 }
            );
        }

        // Validate station IDs exist
        const originStation = findStationById(origine);
        const destStation = findStationById(destinazione);

        if (!originStation) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Invalid origine station ID: ${origine}`
                },
                { status: 400 }
            );
        }

        if (!destStation) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Invalid destinazione station ID: ${destinazione}`
                },
                { status: 400 }
            );
        }

        // ========================================
        // CALL OFFICIAL EAV API
        // ========================================

        const eavUrl = 'https://planner.eavsrl.it/Home/Create';

        // Prepare form data as the API expects application/x-www-form-urlencoded
        const formData = new URLSearchParams();
        formData.append('origine', origine);
        formData.append('destinazione', destinazione);
        formData.append('data', data);
        formData.append('ora', ora);

        console.log('Calling EAV API with:', {
            url: eavUrl,
            formData: formData.toString()
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

        console.log('EAV API Response:', {
            status: eavResponse.status,
            statusText: eavResponse.statusText,
            ok: eavResponse.ok
        });

        if (!eavResponse.ok) {
            const errorText = await eavResponse.text();
            console.error('EAV API Error Details:', errorText);
            return NextResponse.json(
                {
                    success: false,
                    error: `EAV API error: ${eavResponse.status} ${eavResponse.statusText}`,
                    details: errorText
                },
                { status: 502 }
            );
        }

        const eavData: EAVApiResponse = await eavResponse.json();

        // ========================================
        // TRANSFORM EAV RESPONSE
        // ========================================

        // Check if there are any routes available
        if (!eavData.CorsePercorso || eavData.CorsePercorso.length === 0) {
            return NextResponse.json({
                success: true,
                trains: [],
                message: 'no_trains_found',
                originStation: originStation.nome,
                destinationStation: destStation.nome
            });
        }

        // Transform EAV data to our format
        const trains: EAVTrainResult[] = eavData.CorsePercorso.map((corsa, index) => {
            const isConnection = corsa.percorsi.length > 1;

            if (isConnection) {
                // Multi-segment journey with transfers
                const segments: any[] = corsa.percorsi.map((percorso) => ({
                    trainCode: percorso.codice,
                    departureTime: parseEAVDate(percorso.partenza).toISOString(),
                    arrivalTime: parseEAVDate(percorso.arrivo).toISOString(),
                    departureStation: percorso.Descrizione_origine,
                    arrivalStation: percorso.Descrizione_destinazione,
                    trainType: percorso.tipologia,
                    isDelayed: percorso.ritardo > 0,
                    delayMinutes: percorso.ritardo,
                    isCancelled: percorso.soppressa,
                    line: percorso.DLinea
                }));

                // Extract transfer stations (arrival station of each segment except the last one)
                const transferStations = segments.slice(0, -1).map(segment => segment.arrivalStation);

                const firstSegment = corsa.percorsi[0];
                const lastSegment = corsa.percorsi[corsa.percorsi.length - 1];

                return {
                    id: `${firstSegment.codice}-${index}`,
                    trainCode: firstSegment.codice, // Use first train code as main reference
                    departureTime: parseEAVDate(corsa.partenza).toISOString(),
                    arrivalTime: parseEAVDate(corsa.arrivo).toISOString(),
                    departureStation: corsa.Descrizione_origine,
                    arrivalStation: corsa.Descrizione_destinazione,
                    trainType: firstSegment.tipologia,
                    isDelayed: corsa.percorsi.some(p => p.ritardo > 0),
                    delaMinutes: Math.max(...corsa.percorsi.map(p => p.ritardo)),
                    isCancelled: corsa.percorsi.some(p => p.soppressa),
                    line: firstSegment.DLinea,
                    isConnection: true,
                    segments: segments,
                    transferStations: transferStations
                };
            } else {
                // Single direct journey
                const mainPercorso = corsa.percorsi[0];

                return {
                    id: `${mainPercorso.codice}-${index}`,
                    trainCode: mainPercorso.codice,
                    departureTime: parseEAVDate(corsa.partenza).toISOString(),
                    arrivalTime: parseEAVDate(corsa.arrivo).toISOString(),
                    departureStation: corsa.Descrizione_origine,
                    arrivalStation: corsa.Descrizione_destinazione,
                    trainType: mainPercorso.tipologia,
                    isDelayed: mainPercorso.ritardo > 0,
                    delaMinutes: mainPercorso.ritardo,
                    isCancelled: mainPercorso.soppressa,
                    line: mainPercorso.DLinea,
                    isConnection: false
                };
            }
        });

        // Sort trains by departure time
        trains.sort((a, b) => new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime());

        return NextResponse.json({
            success: true,
            trains,
            originStation: originStation.nome,
            destinationStation: destStation.nome,
            searchDate: data,
            searchTime: ora
        });

    } catch (error) {
        console.error('EAV API Route Error:', error);

        return NextResponse.json(
            {
                success: false,
                error: 'Internal server error while processing EAV API request',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}

/**
 * GET handler - not supported for this endpoint
 */
export async function GET() {
    return NextResponse.json(
        {
            success: false,
            error: 'Method not allowed. Use POST to search trains.'
        },
        { status: 405 }
    );
}
