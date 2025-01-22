const { prisma } = require('../config/database');
const bcrypt = require('bcrypt');

const regcon = { 
  showRegis: async (req, res) => {
    try {
      res.render("register", { activePage: "register"});
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: error });
    }
  },
  register: async (req, res) => {
    const { email, username, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email: email,
          username: username,
          password: hashedPassword,
        },
      });

      res.render("login", { message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.render("register", { message: 'Server error', error: error.message });
    }
  }};
  
  module.exports = { regcon };