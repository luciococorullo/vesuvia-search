import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearDatabase() {
    try {
        console.log('🧹 Clearing all database data...');

        await prisma.trainStop.deleteMany();
        console.log('   ✅ Deleted all train stops');

        await prisma.train.deleteMany();
        console.log('   ✅ Deleted all trains');

        await prisma.station.deleteMany();
        console.log('   ✅ Deleted all stations');

        console.log('🎉 Database cleared successfully!');

    } catch (error) {
        console.error('❌ Error clearing database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

clearDatabase();
