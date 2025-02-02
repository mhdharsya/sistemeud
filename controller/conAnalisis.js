const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const showAnalisis = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        // Ambil data malware yang belum dianalisis
        const malwareFiles = await prisma.malwareFile.findMany({
            where: {
                status: { not: 'Analyzed' }, // Filter untuk hanya menampilkan file yang belum dianalisis
            },
            skip: offset,
            take: limit,
            include: {
                analysis: true,
                user: true,
            },
        });

        const totalFiles = await prisma.malwareFile.count({
            where: {
                status: { not: 'Analyzed' }, // Total file yang belum dianalisis
            },
        });
        const totalPages = Math.ceil(totalFiles / limit);

        res.render("analisis", {
            activePage: "analisis",
            malwareFiles,
            currentPage: page,
            totalFiles,
            totalPages,
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: error });
    }
};

module.exports = {
    showAnalisis,
};
