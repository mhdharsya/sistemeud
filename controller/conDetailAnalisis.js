const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const showDetailAnalisis = async (req, res) => {
    try {
        // Ambil ID dari query string (misalnya: /detail-analisis?id=1)
        const fileId = parseInt(req.query.id) || 1;

        // Ambil data file malware berdasarkan ID
        const malwareFile = await prisma.malwareFile.findUnique({
            where: { id: fileId },
            include: {
                analysis: true, // Termasuk analisis terkait
                user: true, // Termasuk informasi pengguna (optional)
            },
        });

        // Jika file tidak ditemukan, tampilkan pesan error
        if (!malwareFile) {
            return res.status(404).json({ message: 'File tidak ditemukan' });
        }

        // Kirim data ke halaman detailAnalisis
        res.render("detailAnalisis", {
            activePage: "detailAnalisis",
            malwareFile,
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: error });
    }
};

module.exports = {
    showDetailAnalisis,
};
