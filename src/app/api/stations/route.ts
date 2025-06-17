import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CreateStationSchema } from '@/lib/types';

export async function GET() {
    try {
        const stations = await prisma.station.findMany({
            orderBy: { name: 'asc' }
        });

        return NextResponse.json(stations);
    } catch (error) {
        console.error('Error fetching stations:', error);
        return NextResponse.json(
            { error: 'Errore nel recupero delle stazioni' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validatedData = CreateStationSchema.parse(body);

        const station = await prisma.station.create({
            data: validatedData
        });

        return NextResponse.json(station, { status: 201 });
    } catch (error) {
        console.error('Error creating station:', error);

        if (error instanceof Error && 'code' in error && error.code === 'P2002') {
            return NextResponse.json(
                { error: 'Una stazione con questo codice esiste già' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: 'Errore nella creazione della stazione' },
            { status: 500 }
        );
    }
}
