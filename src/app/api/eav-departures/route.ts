/**
 * @fileoverview EAV Departures API Route
 * 
 * This API endpoint calls the official EAV departures API to get real-time
 * departure information from a specific station            return NextResponse.json({
                success: true,
                trains: departures,
                station: station.nome,
                stationId: stazione,
                type: tipo === 'A' ? 'arrivals' : 'departures',
                message: departures.length > 0 ? 'successDeparturesFound' : 'noDeparturesFound'
            } as EAVDepartureResponse); Endpoint: POST /api/eav-departures
 * 
 * Body Parameters:
 * - stazione: Station ID (from EAV stations)
 * - tipo: A = arrivals, P = departures (default: A)
 * 
 * @author VesuviaSearch Team
 * @version 1.0.0
 */

import { NextRequest, NextResponse } from 'next/server';
import { findStationById } from '@/lib/eav-stations';

/**
 * Response structure from EAV departures API
 */
interface EAVDepartureResponse {
    success: boolean;
    trains: EAVDepartureResult[];
    station?: string;
    stationId?: string;
    type?: 'arrivals' | 'departures';
    error?: string;
    message?: string;
}

/**
 * Individual departure/arrival result
 */
interface EAVDepartureResult {
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
 * Request parameters for departures search
 */
interface EAVDeparturesRequest {
    stazione: string;  // Station ID
    tipo?: 'A' | 'P';  // A = arrivals, P = departures
}

/**
 * POST handler for EAV departures requests
 * 
 * @param request - Next.js request object with search parameters
 * @returns Promise<NextResponse> JSON response with departure results
 */
export async function POST(request: NextRequest) {
    try {
        // ========================================
        // PARSE AND VALIDATE REQUEST BODY
        // ========================================

        const body: EAVDeparturesRequest = await request.json();
        const { stazione, tipo = 'A' } = body;

        // Validate required parameters
        if (!stazione) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Missing required parameter: stazione'
                },
                { status: 400 }
            );
        }

        // Validate station ID exists
        const station = findStationById(stazione);
        if (!station) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Invalid station ID: ${stazione}`
                },
                { status: 400 }
            );
        }

        // ========================================
        // CALL OFFICIAL EAV DEPARTURES API
        // ========================================

        const eavUrl = 'https://orariotreni.eavsrl.it/teleindicatori/ws_getData.php';

        // Prepare form data as the API expects application/x-www-form-urlencoded
        const formData = new URLSearchParams();
        formData.append('tipoLista', tipo);
        formData.append('codLoc', stazione);
        formData.append('visualizzazione', 'mobile');

        console.log('Calling EAV Departures API with:', {
            url: eavUrl,
            formData: formData.toString()
        });

        const eavResponse = await fetch(eavUrl, {
            method: 'POST',
            headers: {
                'Accept': 'text/html, */*; q=0.01',
                'Accept-Language': 'en-US,en;q=0.9,it;q=0.8',
                'Connection': 'keep-alive',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'DNT': '1',
                'Origin': 'https://orariotreni.eavsrl.it',
                'Referer': `https://orariotreni.eavsrl.it/teleindicatori/?stazione=${stazione}&tipo=${tipo}`,
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

        // ========================================
        // PROCESS EAV API RESPONSE
        // ========================================

        if (!eavResponse.ok) {
            console.error('EAV API error:', {
                status: eavResponse.status,
                statusText: eavResponse.statusText
            });

            return NextResponse.json(
                {
                    success: false,
                    error: `EAV API error: ${eavResponse.status} ${eavResponse.statusText}`,
                    trains: [],
                    station: station.nome,
                    stationId: stazione,
                    type: tipo === 'A' ? 'arrivals' : 'departures'
                } as EAVDepartureResponse,
                { status: 500 }
            );
        }

        const responseText = await eavResponse.text();
        console.log('EAV API raw response:', responseText.substring(0, 500));

        // ========================================
        // PARSE AND TRANSFORM RESPONSE
        // ========================================

        try {
            // The EAV API might return HTML or JSON, we need to handle both
            let departures: EAVDepartureResult[] = [];

            if (responseText.trim().startsWith('<')) {
                // HTML response - parse the HTML content
                departures = parseHTMLDepartures(responseText);
            } else {
                // JSON response - parse as JSON
                const jsonResponse = JSON.parse(responseText);
                departures = parseJSONDepartures(jsonResponse);
            }

            return NextResponse.json({
                success: true,
                trains: departures,
                station: station.nome,
                stationId: stazione,
                type: tipo === 'A' ? 'arrivals' : 'departures',
                message: departures.length > 0 ? 'successDeparturesFound' : 'noDeparturesFound'
            } as EAVDepartureResponse);

        } catch (parseError) {
            console.error('Error parsing EAV response:', parseError);

            return NextResponse.json(
                {
                    success: false,
                    error: 'Failed to parse EAV API response',
                    trains: [],
                    station: station.nome,
                    stationId: stazione,
                    type: tipo === 'A' ? 'arrivals' : 'departures'
                } as EAVDepartureResponse,
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('EAV Departures API error:', error);

        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred',
                trains: []
            } as EAVDepartureResponse,
            { status: 500 }
        );
    }
}

/**
 * Parse HTML response from EAV API
 */
function parseHTMLDepartures(html: string): EAVDepartureResult[] {
    const departures: EAVDepartureResult[] = [];

    try {
        // The EAV API returns HTML tables with specific CSS classes
        // Structure: numTreno, categoria, destinazione, informazioni, binario, orario, ritardo

        // Look for table rows with train data (rows with class "testoGiallo")
        const rows = html.split('<tr');

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            // Skip header rows and empty rows
            if (row.includes('bgcolor="yellow"') ||
                row.includes('nomeLocalita') ||
                row.includes('tipoLista') ||
                !row.includes('testoGiallo') ||
                row.length < 100) {
                continue;
            }

            // Extract train number
            const trainNumberMatch = row.match(/class="numTreno"[^>]*>([^<]*)</);
            const trainNumber = trainNumberMatch ? trainNumberMatch[1].trim().replace(/&nbsp;/g, '') : '';

            // Skip rows with empty train numbers (placeholder rows at the end)
            if (!trainNumber) {
                continue;
            }

            // Extract category/type
            const categoryMatch = row.match(/class="categoria"[^>]*>([^<]*)</);
            const category = categoryMatch ? categoryMatch[1].trim() : '';

            // Extract destination (inside a div with class "destinazione")
            const destinationMatch = row.match(/class="destinazione"[^>]*>([^<]*)</);
            const destination = destinationMatch ? destinationMatch[1].trim() : '';

            // Extract platform/binario
            const platformMatch = row.match(/class="binario"[^>]*>([^<]*)</);
            const platform = platformMatch ? platformMatch[1].trim() : '';

            // Extract time/orario
            const timeMatch = row.match(/class="orario"[^>]*>([^<]*)</);
            const time = timeMatch ? timeMatch[1].trim() : '';

            // Extract delay/ritardo (may contain marquee tags)
            const delayMatch = row.match(/class="ritardo"[^>]*>(.*?)<\/td>/);
            let delay = '';
            if (delayMatch) {
                // Remove marquee tags and extract text
                delay = delayMatch[1].replace(/<[^>]*>/g, '').trim();
            }

            // Extract additional information (may contain status like "SOPPRESSO")
            const infoMatch = row.match(/class="informazioni"[^>]*>(.*?)<\/td>/);
            let status = '';
            if (infoMatch) {
                // Remove marquee tags and extract text
                status = infoMatch[1].replace(/<[^>]*>/g, '').trim();
                // Clean up common status messages
                if (status.includes('CAMPANIA EXPRESS')) {
                    status = 'CAMPANIA EXPRESS';
                } else if (status.includes('SOPPRESSO')) {
                    status = 'SOPPRESSO';
                }
            }

            // Determine train type based on category
            let trainType = '';
            switch (category) {
                case 'DD':
                    trainType = 'Diretto';
                    break;
                case 'EXP':
                    trainType = 'Campania Express';
                    break;
                default:
                    trainType = category;
            }

            // Only add valid departures
            if (trainNumber && time) {
                departures.push({
                    id: `departure-${departures.length}`,
                    trainNumber: trainNumber,
                    destination: destination || 'N/A',
                    time: time,
                    platform: platform && platform !== '' ? platform : undefined,
                    trainType: trainType && trainType !== '' ? trainType : undefined,
                    status: status && status !== '' ? status : undefined,
                    delay: delay && delay !== '' && delay !== 'SOPPRESSO' ? delay : undefined
                });
            }
        }

        console.log(`Parsed ${departures.length} departures from HTML`);

    } catch (error) {
        console.error('Error parsing HTML departures:', error);
    }

    return departures;
}

/**
 * Parse JSON response from EAV API
 */
function parseJSONDepartures(data: unknown): EAVDepartureResult[] {
    const departures: EAVDepartureResult[] = [];

    // Parse the JSON structure returned by the EAV API
    // This depends on the actual structure returned by the API

    if (Array.isArray(data)) {
        data.forEach((item: { [key: string]: unknown }, index: number) => {
            departures.push({
                id: `departure-${index}`,
                trainNumber: (item.numero || item.train || 'N/A') as string,
                destination: (item.destinazione || item.destination || 'N/A') as string,
                time: (item.orario || item.time || 'N/A') as string,
                delay: item.ritardo as string || item.delay as string,
                platform: item.binario as string || item.platform as string,
                trainType: item.tipo as string || item.type as string,
                status: item.stato as string || item.status as string
            });
        });
    }

    return departures;
}
