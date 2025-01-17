const sql = require('mssql');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

if (!process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_SERVER || !process.env.DB_NAME || !process.env.DB_PORT) {
    throw new Error('One or more required environment variables are missing');
}

const db = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT, 10) || 1433,
    options: {
        encrypt: true,
        trustServerCertificate: false,
    },
};

console.log('Konfigurasi:', db);

const connectToDatabase = async () => {
    try {
        console.log('Memulai koneksi ke database...');
        const pool = await sql.connect(db);
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