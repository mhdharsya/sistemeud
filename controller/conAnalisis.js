const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const showAnalisis = async (req, res) => {
    try {
        // Ambil page dan limit dari query parameter, jika tidak ada gunakan default value
        const page = parseInt(req.query.page) || 1;
        const limit = 10; // Menampilkan 10 data per halaman

        // Hitung offset untuk pagination
        const offset = (page - 1) * limit;

        // Ambil data malware dengan limit dan offset
        const malwareFiles = await prisma.malwareFile.findMany({
            skip: offset,
            take: limit,
            include: {
                analysis: true,
                user: true,
            },
        });

        // Hitung total data untuk mengetahui jumlah halaman
        const totalFiles = await prisma.malwareFile.count();
        const totalPages = Math.ceil(totalFiles / limit);

        res.render("analisis", {
            activePage: "analisis",
            malwareFiles,
            currentPage: page,
            totalFiles, // Menambahkan totalFiles ke variabel yang dikirim ke view
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
