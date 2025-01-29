const Malware = require('../models/malwareModel');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

exports.uploadMalware = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = req.file;
    const uploadPath = path.join(__dirname, '../uploads', file.filename);

    // Calculate file hash
    const fileBuffer = fs.readFileSync(uploadPath);
    const fileHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

    // Ensure user_id is available in the JWT
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const user_id = req.user.userId;
    const status = 'pending'; // Example: set initial status

    await Malware.create(file.originalname, fileHash, file.size, file.mimetype, user_id, status);
    res.status(201).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.showUpload = (req, res) => {
  res.render('upload', { activePage: 'upload' }); // Pass the activePage variable to the template
};