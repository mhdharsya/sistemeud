const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const showDetailRiwayat = async (req, res) => {
  try {
    // Ambil ID dari query string
    const fileId = parseInt(req.query.id);  // Pastikan mengonversi ID menjadi angka

    if (isNaN(fileId)) {
      return res.status(400).json({ message: 'ID tidak valid' });
    }

    // Ambil data dari database berdasarkan fileId
    const malwareFile = await prisma.malwareFile.findUnique({
      where: { id: fileId },
      include: {
        analysis: true, // Menyertakan data analisis terkait
      },
    });

    // Cek apakah file ditemukan
    if (!malwareFile) {
      return res.status(404).json({ message: 'Malware file tidak ditemukan' });
    }

    // Kirim data ke view
    res.render("detailRiwayat", {
      activePage: "detailRiwayat",
      malwareFile,
      analysis: malwareFile.analysis, // Mengirim data file malware dan analisis ke view
    });

  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  showDetailRiwayat
};
