const Malware = require('../models/malwareModel');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

exports.uploadMalware = async (req, res) => {
  try {
    // Pastikan file diupload
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const files = req.files;

    // Ambil malwareType dan riskLevel dari body request
    const { malwareType, riskLevel } = req.body;

    // Validasi input malwareType dan riskLevel
    if (!malwareType || !['Trojan', 'Virus', 'Ransomware', 'Spyware', 'Worm'].includes(malwareType)) {
      return res.status(400).json({ message: 'Invalid malware type' });
    }

    if (!riskLevel || !['Low', 'Medium', 'High', 'Critical'].includes(riskLevel)) {
      return res.status(400).json({ message: 'Invalid risk level' });
    }

    // Proses setiap file yang diupload
    for (const file of files) {
      const uploadPath = path.join(__dirname, '../uploads', file.filename);

      // Hitung hash file
      const fileBuffer = fs.readFileSync(uploadPath);
      const fileHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

      // Pastikan user_id ada dalam JWT
      if (!req.user || !req.user.userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
      const user_id = req.user.userId;
      const status = 'Pending'; // Status awal file

      // Panggil fungsi create dari model untuk menyimpan data
      await Malware.create(file.originalname, fileHash, file.size, file.mimetype, user_id, status, malwareType, riskLevel);
    }
    
    res.status(201).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.showUpload = (req, res) => {
  res.render('upload', { activePage: 'upload' }); // Render halaman upload
};
