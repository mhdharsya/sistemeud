const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const showRiwayat = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    // Ambil filter dari query parameter
    const type = req.query.type || '';
    const dateStart = req.query.dateStart || '';
    const dateEnd = req.query.dateEnd || '';
    const search = req.query.search || '';  // Ambil parameter pencarian

    // Menyusun query filter untuk Prisma
    const whereClause = {
      status: "Analyzed", // hanya data yang dianalisis
    };

    // Filter berdasarkan jenis malware
    if (type) {
      whereClause.malwareType = type;
    }

    // Filter berdasarkan rentang tanggal
    if (dateStart && dateEnd) {
      whereClause.uploadDate = {
        gte: new Date(dateStart), // Tanggal mulai
        lte: new Date(dateEnd),   // Tanggal akhir
      };
    }

    // Filter berdasarkan pencarian nama
    if (search) {
      whereClause.name = {
        contains: search, // Mencari nama malware yang mengandung string pencarian
      };
    }

    // Ambil data malware sesuai filter
    const malwareFiles = await prisma.malwareFile.findMany({
      where: whereClause,
      skip: offset,
      take: limit,
      include: {
        analysis: true,
      },
    });

    // Hitung total data yang sesuai dengan filter
    const totalFiles = await prisma.malwareFile.count({
      where: whereClause,
    });

    const totalPages = Math.ceil(totalFiles / limit);

    // Kirim data ke view
    res.render("riwayat", {
      activePage: "riwayat",
      malwareFiles,
      currentPage: page,
      totalPages,
      totalFiles,
      type, // Kirimkan type ke view
      dateStart, // Kirimkan dateStart ke view
      dateEnd, // Kirimkan dateEnd ke view
      search, // Kirimkan search ke view
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error });
  }
};

module.exports = {
  showRiwayat,
};
