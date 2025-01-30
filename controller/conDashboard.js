const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const showDashboard = async (req, res) => {
  try {
    // Ambil data statistik dari database
    const totalMalware = await prisma.malwareFile.count();

    // Menghitung jumlah malware dengan risiko tinggi (risk_level)
    const highRiskMalware = await prisma.analysisResult.count({
      where: {
        risk_level: 'High'  // Gantilah 'riskLevel' menjadi 'risk_level'
      }
    });

    // Ambil jumlah malware yang terdeteksi bulan ini
    const detectedThisMonth = await prisma.malwareFile.count({
      where: {
        upload_date: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) // Ambil data sejak awal bulan ini
        }
      }
    });

    // Menghitung jumlah kasus yang sudah diselesaikan (status = 'Complete')
    const resolvedCases = await prisma.malwareFile.count({
      where: {
        status: 'Complete'  // Pastikan kolom 'status' ada di model 'AnalysisResult'
      }
    });

    // Ambil data analisis terbaru (misalnya 5 analisis terakhir)
    const recentAnalyses = await prisma.analysisResult.findMany({
      orderBy: {
        analysis_date: 'desc' // Mengurutkan berdasarkan tanggal analisis
      },
      take: 5
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
