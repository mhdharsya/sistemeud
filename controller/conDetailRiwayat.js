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

const deleteMalwareFile = async (req, res) => {
  try {
    const fileId = parseInt(req.params.id);
    if (isNaN(fileId)) {
      return res.status(400).json({ message: 'ID tidak valid' });
    }

    // Hapus record terkait terlebih dahulu (misalnya, di tabel Analysis)
    await prisma.analysisResult.deleteMany({
      where: { malwareFileId: fileId },
    });

    // Setelah record terkait dihapus, hapus record di MalwareFile
    await prisma.malwareFile.delete({
      where: { id: fileId },
    });

    res.redirect(303, '/riwayat'); // redirect ke halaman riwayat atau kirim response sukses
  } catch (error) {
    console.error("Error deleting malware file:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  showDetailRiwayat, deleteMalwareFile
};
