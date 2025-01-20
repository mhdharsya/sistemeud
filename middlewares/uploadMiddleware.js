const fileUpload = require('express-fileupload');

const uploadMiddleware = fileUpload({
  createParentPath: true,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max file size
});

module.exports = uploadMiddleware;