const nodemailer = require('nodemailer');
require('dotenv').config();

// Menggunakan Sendinblue SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com', // Host dari tab "SMTP"
  port: 587, // Port dari tab "SMTP"
  auth: {
    user: '8557db001@smtp-brevo.com', // Login dari tab "SMTP"
    pass: 'xsmtpsib-4ae391ec5678cf0cf8c3516ae6dd3814eaa198bbbc8920255f644140a42bf948-2LZX7pD0xaPs4zgv', // Ganti dengan Master Password atau SMTP Key dari tab "SMTP"
  },
});


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
