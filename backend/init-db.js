import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

const prisma = new PrismaClient();

async function main() {
  try {
    // ตรวจสอบการมีอยู่ของตาราง
    const tables = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema='public'`;

    if (tables.length === 0) {
      console.log('No tables found, running migrations...');
      // รันคำสั่ง migrate เพื่อสร้างตาราง
      execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    } else {
      console.log('Tables already exist, skipping migration.');
    }
  } catch (error) {
    console.error('Error checking tables or running migration:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
