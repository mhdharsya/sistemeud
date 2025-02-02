const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { getDashboardData } = require("../controller/conChart");

const showDashboard = async (req, res) => {
  try {
    // Ambil data statistik dari database
    const totalMalware = await prisma.malwareFile.count();

    // Menghitung jumlah malware dengan risiko tinggi (risk_level)
    const highRiskMalware = await prisma.malwareFile.count({
      where: {
        riskLevel: "Critical"
      }
    });

    // Ambil jumlah malware yang terdeteksi bulan ini
    const detectedThisMonth = await prisma.malwareFile.count({
      where: {
        uploadDate: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) // Ambil data sejak awal bulan ini
        }
      }
    });

    // Menghitung jumlah kasus yang sudah diselesaikan (status = 'Complete') dari model MalwareFile
    const resolvedCases = await prisma.malwareFile.count({
      where: {
        status: 'Analyzed'  // Pastikan 'status' sesuai dengan nilai di schema (status di MalwareFile)
      }
    });

    // Ambil data analisis terbaru (misalnya 5 analisis terakhir) dari model AnalysisResult
    const recentAnalyses = await prisma.analysisResult.findMany({
      orderBy: {
        analysisDate: 'desc' // Mengurutkan berdasarkan tanggal analisis terbaru
      },
      take: 5,
      include: {
        malwareFile: true, // Menyertakan data dari malwareFile
      },
    });

    // Kirim data ke tampilan
    res.render("dashboard", {
      activePage: "dashboard",
      totalMalware,
      highRiskMalware,
      detectedThisMonth,
      resolvedCases,
      recentAnalyses
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  showDashboard
};
