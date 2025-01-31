const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getDashboardData = async (req, res) => {
  try {
    // 1. Distribusi jenis malware
    const malwareTypes = await prisma.malwareFile.groupBy({
      by: ['malwareType'],  // Mengelompokkan berdasarkan jenis malware
      _count: {
        malwareType: true  // Menghitung jumlah per jenis malware
      }
    });

    // 2. Tren bulanan
    const monthlyTrend = await prisma.malwareFile.groupBy({
      by: ['uploadDate'],
      _count: {
        uploadDate: true
      },
      where: {
        uploadDate: {
          gte: new Date(new Date().getFullYear(), 0, 1), // Ambil data sejak awal tahun
        }
      },
      orderBy: {
        uploadDate: 'asc',
      }
    });

    // 3. EUD Threat Overview (Ancaman berdasarkan nama malware)
    const threatOverview = await prisma.malwareFile.groupBy({
      by: ['name'],
      _count: {
        name: true,
      }
    });

    // Kirim data ke frontend dalam format JSON
    res.json({
      malwareTypes: malwareTypes.map(item => ({
        type: item.malwareType,
        count: item._count.malwareType,
      })),
      monthlyTrend: monthlyTrend.map(item => ({
        month: item.uploadDate.toISOString().slice(5, 7), // Ambil bulan
        count: item._count.uploadDate,
      })),
      threatOverview: threatOverview.map(item => ({
        threat: item.name,
        count: item._count.name,
      })),
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardData
};
