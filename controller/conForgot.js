const nodemailer = require('nodemailer');
require('dotenv').config();

// Menggunakan Sendinblue SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // Host dari tab "SMTP"
  port: process.env.SMTP_PORT, // Port dari tab "SMTP"
  auth: {
    user: process.env.SMTP_USER, // Login dari tab "SMTP"
    pass: process.env.SMTP_PASS, // Ganti dengan Master Password atau SMTP Key dari tab "SMTP"
  },
});

console.log(process.env.SMTP_HOST);
console.log(process.env.SMTP_PORT);
console.log(process.env.SMTP_USER);
console.log(process.env.SMTP_PASS);

const showForgot = async (req, res) => {
  try {
    res.render("forgotPassword", { activePage: "forgotPassword" });
  } catch (error) {
    console.log("Error rendering forgot password page:", error);
    res.status(500).json({ message: error.message });
  }
};

const sendResetLink = async (req, res) => {
  const { email } = req.body;

  try {
    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.render("forgotPassword", { 
        activePage: "forgotPassword", 
        error: "Format email tidak valid." 
      });
    }

    // Buat link reset password (gunakan token yang lebih aman di dunia nyata)
    const resetToken = "someRandomToken"; // Ganti dengan token unik dari database atau JWT
    const resetLink = `http://localhost:3000/reset?token=${resetToken}`;

    // Konfigurasi email yang akan dikirim
    const mailOptions = {
      from: 'bmada2011@gmail.com',  // Ganti dengan email yang valid di akun Sendinblue Anda
      to: email,
      subject: 'Reset Password',
      text: `Hai, kami menerima permintaan untuk mereset password Anda.\n\nKlik link berikut untuk mereset password Anda: ${resetLink}\n\nJika Anda tidak meminta reset password, abaikan email ini.`,
    };

    // Kirim email reset password
    await transporter.sendMail(mailOptions);

    res.render("wait", { 
      activePage: "wait", 
      email : email,
    });
  } catch (error) {
    console.log("Error sending reset password email:", error);
    res.render("forgotPassword", { 
      activePage: "forgotPassword", 
      error: "Terjadi kesalahan saat mengirim email. Coba lagi nanti." 
    });
  }
};

module.exports = {
  showForgot,
  sendResetLink,
};
