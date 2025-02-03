const { prisma } = require('../config/database');
const bcrypt = require('bcrypt');

const regcon = { 
  showRegis: async (req, res) => {
    try {
      res.render("register", { activePage: "register" });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ success: false, message: error.message });
    }
  },
  register: async (req, res) => {
    const { email, username, password } = req.body;

    try {
      // Hash password before storing
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const user = await prisma.user.create({
        data: {
          email: email,
          username: username,
          password: hashedPassword,
        },
      });

      // Send a JSON response indicating success
      res.json({ success: true, message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);

      // Send a JSON response with error details
      res.json({ success: false, message: 'Server error', error: error.message });
    }
  }
};

module.exports = { regcon };
