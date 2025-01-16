require('dotenv').config();
const sql = require('mssql');

const config = {
    user:process.env.AZURE_SQL_USER,
    password: process.env.AZURE_SQL_PASSWORD,
    server: process.env.AZURE_SQL_SERVER,
    database: process.env.AZURE_SQL_DATABASE,
    port: parseInt(process.env.AZURE_SQL_PORT, 10),
    options: {
        encrypt: true,
        trustServerCertificate: false,
    },
};

console.log('Konfigurasi:', config);

const connectToDatabase = async () => {
    try {
        console.log('Memulai koneksi ke database...');
        const pool = await sql.connect(config);
        console.log('Berhasil terhubung ke database.');
        return pool;
    } catch (err) {
        console.error('Gagal terhubung ke database:', err.message);
        throw err;
    }
};

(async () => {
    try {
        await connectToDatabase();
    } catch (err) {
        console.error('Kesalahan koneksi:', err);
    }
})();