const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const showRiwayat = async (req, res) => {
  try {
    // Ambil data MalwareFile dan relasinya, seperti nama file, jenis malware, status analisis, dll.
    const malwareFiles = await prisma.malwareFile.findMany({
      include: {
        analysis: true, // Mengambil data relasi analysisResult
      },
    });

    // Kirim data ke view 'riwayat'
    res.render("riwayat", {
      activePage: "riwayat",
      malwareFiles,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error });
  }
};

module.exports = {
  showRiwayat,
};
