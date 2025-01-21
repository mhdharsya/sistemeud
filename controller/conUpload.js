const Malware = require('../models/malwareModel');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

exports.uploadMalware = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = req.files.malwareFile; // Ensure this matches the name attribute in the form
    const uploadPath = path.join(__dirname, '../uploads', file.name);

    // Move the file to the uploads directory
    file.mv(uploadPath, async (err) => {
      if (err) {
        console.error('Error moving file:', err);
        return res.status(500).json({ message: 'Server error', error: err.message });
      }

      // Calculate file hash
      const fileBuffer = fs.readFileSync(uploadPath);
      const fileHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

      // Assuming user_id and status are available in the request or session
      const user_id = req.session.userId; // Example: get user ID from session
      const status = 'pending'; // Example: set initial status

      await Malware.create(file.name, fileHash, file.size, file.mimetype, user_id, status);
      res.status(201).json({ message: 'File uploaded successfully' });
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.showUpload = (req, res) => {
  res.render('upload', { activePage: 'upload' }); // Pass the activePage variable to the template
};