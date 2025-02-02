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

const updateAnalysisResult = async (req, res) => {
    const { analysisDetails, detectedBehaviors, recommendations, resultStatus } = req.body;
    const fileId = parseInt(req.params.id);

    try {
        const updatedAnalysis = await prisma.analysisResult.update({
            where: { malwareFileId: fileId },
            data: {
                analysisDetails,
                detectedBehaviors,
                recommendations,
                resultStatus,
            },
        });

        res.json(updatedAnalysis);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// Membuat hasil analisis baru untuk file malware (jika belum ada analisis)
const createAnalysisResult = async (req, res) => {
    try {
        const fileId = parseInt(req.query.id, 10); // Ambil ID dari query string
        if (isNaN(fileId)) {
            return res.status(400).json({ message: 'ID file tidak valid' });
        }

        let { behaviors, analysis_detail, recommendations } = req.body;

        // Cek apakah detectedBehaviors adalah array
        behaviors = Array.isArray(behaviors) ? behaviors : [];

        const malwareFile = await prisma.malwareFile.findUnique({
            where: { id: fileId },
        });

        if (!malwareFile) {
            return res.status(404).json({ message: 'File tidak ditemukan' });
        }

        // Simpan hasil analisis
        const analysis = await prisma.analysisResult.create({
            data: {
                malwareFileId: fileId,
                analysisDetails: analysis_detail,
                detectedBehaviors: behaviors.join(', '), // Gabungkan array menjadi string
                recommendations: recommendations,
                resultStatus: 'Analyzed', // Status hasil analisis
            },
        });

        // Update status malware file menjadi 'Analyzed'
        await prisma.malwareFile.update({
            where: { id: fileId },
            data: { status: 'Analyzed' },
        });

        res.redirect('/analisis');

    } catch (error) {
        console.error("Error during analysis creation:", error);
        res.status(500).json({ message: 'Terjadi kesalahan saat memproses data', error: error.message });
    }
};

module.exports = {
    showDetailAnalisis,
    updateAnalysisResult,
    createAnalysisResult,
};