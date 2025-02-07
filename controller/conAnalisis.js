const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const showAnalisis = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const type = req.query.type || '';
        const dateStart = req.query.dateStart || '';
        const dateEnd = req.query.dateEnd || '';
        const search = req.query.search || '';

        // Membuat klausa pencarian dinamis
        const whereClause = {
            status: { not: 'Analyzed' }, // Hanya file yang belum dianalisis
        };

        if (type) whereClause.malwareType = type;
        if (dateStart && dateEnd) {
            whereClause.uploadDate = {
                gte: new Date(dateStart),
                lte: new Date(dateEnd),
            };
        }

        // Pencarian dengan case-insensitive
        if (search) {
            whereClause.name = {
                contains: search,  // Pencarian berdasarkan nama yang mengandung kata pencarian
            };
        }

        // Ambil data malware sesuai filter
        const malwareFiles = await prisma.malwareFile.findMany({
            where: whereClause,
            skip: offset,
            take: limit,
            include: {
                analysis: true,
                user: true,
            },
        });

        // Hitung total data sesuai filter
        const totalFiles = await prisma.malwareFile.count({
            where: whereClause,
        });

        const totalPages = Math.ceil(totalFiles / limit);

        res.render("analisis", {
            activePage: "analisis",
            malwareFiles,
            currentPage: page,
            totalFiles,
            totalPages,
            type, // Kirimkan filter type ke view
            dateStart, // Kirimkan filter dateStart ke view
            dateEnd, // Kirimkan filter dateEnd ke view
            search, // Kirimkan filter search ke view
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: error });
    }
};

module.exports = {
    showAnalisis,
};