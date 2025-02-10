const rateLimit = require("express-rate-limit");

const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 5, // Maksimal 5 permintaan per 15 menit
  message: "Terlalu banyak permintaan reset password. Coba lagi nanti."
});

module.exports = forgotPasswordLimiter;
