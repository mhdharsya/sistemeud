const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log('Connected to the database');
  } catch (err) {
    console.error('Kesalahan koneksi:', err);
  }
}

module.exports = { prisma, connectToDatabase };