import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CreateTrainSchema } from '@/lib/types';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const isCampaniaExpress = searchParams.get('isCampaniaExpress');
        const category = searchParams.get('category');
        const direction = searchParams.get('direction');

        const where: {
            isCampaniaExpress?: boolean;
            category?: string;
            direction?: string;
        } = {};

        if (isCampaniaExpress === 'true') {
            where.isCampaniaExpress = true;
        }

        if (category) {
            where.category = category;
        }

        if (direction) {
            where.direction = direction;
        }

        const trains = await prisma.train.findMany({
            where,
            include: {
                startStation: true,
                endStation: true,
                stops: {
                    include: {
                        station: true
                    },
                    orderBy: { stopOrder: 'asc' }
                }
            },
            orderBy: { departureTime: 'asc' }
        });

        return NextResponse.json(trains);
    } catch (error) {
        console.error('Error fetching trains:', error);
        return NextResponse.json(
            { error: 'Errore nel recupero dei treni' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validatedData = CreateTrainSchema.parse(body);

        // Verifica che le stazioni esistano
        const [startStation, endStation] = await Promise.all([
            prisma.station.findUnique({ where: { id: validatedData.startStationId } }),
            prisma.station.findUnique({ where: { id: validatedData.endStationId } })
        ]);

        if (!startStation || !endStation) {
            return NextResponse.json(
                { error: 'Una o entrambe le stazioni specificate non esistono' },
                { status: 400 }
            );
        }

        if (validatedData.startStationId === validatedData.endStationId) {
            return NextResponse.json(
                { error: 'La stazione di partenza e arrivo non possono essere uguali' },
                { status: 400 }
            );
        }

        const train = await prisma.train.create({
            data: {
                ...validatedData,
                direction: validatedData.direction,
                operatingDays: validatedData.operatingDays,
                category: validatedData.category,
            },
            include: {
                startStation: true,
                endStation: true,
                stops: {
                    include: {
                        station: true
                    }
                }
            }
        });

        return NextResponse.json(train, { status: 201 });
    } catch (error) {
        console.error('Error creating train:', error);
        return NextResponse.json(
            { error: 'Errore nella creazione del treno' },
            { status: 500 }
        );
    }
}
