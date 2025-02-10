const showWait = async (req, res) => {
    try {
      res.render("wait", { activePage: "wait"});
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: error });
    }
  };
  
  const resendResetLink = async (req, res) => {
    const { email } = req.body;
  
    try {
      // Validasi email
      if (!email) {
        return res.render("wait", { 
          activePage: "wait", 
          error: "Email tidak ditemukan.", 
          email: email 
        });
      }
  
      // Validasi format email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.render("wait", { 
          activePage: "wait", 
          error: "Format email tidak valid.", 
          email: email 
        });
      }
  
      // Buat ulang link reset password
      const resetToken = "anotherRandomToken"; // Buat token baru untuk keamanan
      const resetLink = `http://localhost:3000/reset?token=${resetToken}`;
  
      // Konfigurasi email
      const mailOptions = {
        from: 'your-verified-email@domain.com',  // Ganti dengan email yang valid
        to: email,
        subject: 'Reset Password (Kirim Ulang)',
        text: `Hai, berikut adalah link reset password Anda:\n\n${resetLink}\n\nJika Anda tidak meminta reset password, abaikan email ini.`,
      };
  
      // Kirim ulang email
      await transporter.sendMail(mailOptions);
  
      // Render ulang halaman dengan pesan konfirmasi
      res.render("wait", { 
        activePage: "wait",
        email: email,
        message: "Link reset password telah dikirim ulang ke email Anda."
      });
    } catch (error) {
      console.log("Error resending reset password email:", error);
      res.render("wait", { 
        activePage: "wait", 
        error: "Terjadi kesalahan saat mengirim ulang link reset password.", 
        email: email 
      });
    }
  };  
  
  module.exports = {
    showWait,
    resendResetLink,
  };