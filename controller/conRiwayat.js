const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const showRiwayat = async (req, res) => {
  try {
    // Ambil page dan limit dari query parameter, jika tidak ada gunakan default value
    const page = parseInt(req.query.page) || 1; // Halaman saat ini
    const limit = 10; // Menampilkan 10 data per halaman

    // Hitung offset untuk pagination
    const offset = (page - 1) * limit;

    // Ambil data MalwareFile yang sudah dianalisis dan relasinya dengan limit dan offset
    const malwareFiles = await prisma.malwareFile.findMany({
      where: {
        status: "Analyzed", // Menambahkan kondisi status "Analyzed"
      },
      skip: offset,
      take: limit,
      include: {
        analysis: true, // Mengambil data relasi analysisResult
      },
    });

    // Hitung total data malware dengan status "Analyzed"
    const totalFiles = await prisma.malwareFile.count({
      where: {
        status: "Analyzed", // Hanya menghitung data yang statusnya "Analyzed"
      },
    });
    
    // Hitung total halaman
    const totalPages = Math.ceil(totalFiles / limit);

    // Kirim data ke view 'riwayat'
    res.render("riwayat", {
      activePage: "riwayat",
      malwareFiles,
      currentPage: page, // Kirim halaman saat ini
      totalPages, // Kirim total halaman
      totalFiles, // Kirim total data
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error });
  }
};

module.exports = {
  showRiwayat,
};
