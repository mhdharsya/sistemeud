const { prisma } = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { username: username },
      });

      if (!user) {
        return res.render('login', { error: 'Invalid username or password' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.render('login', { error: 'Invalid username or password' });
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      // Set the token in a cookie
      res.cookie('token', token, { httpOnly: true });

      // Redirect to the dashboard
      res.redirect('/dashboard');
    } catch (error) {
      console.error('Error logging in user:', error);
      res.render('login', { error: 'Server error' });
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to log out' });
      }
      res.redirect('/login');
    });
  },
};

const showLogin = async (req, res) => {
    try {
      res.render("login", { activePage: "login"});
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: error });
    }
  };
  
  module.exports = {
    showLogin, authController
  };