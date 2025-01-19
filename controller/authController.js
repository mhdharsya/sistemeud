const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authController = {
  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await User.findByUsername(username);
      if (!user) {
        return res.render('login', { error: 'Invalid username or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.render('login', { error: 'Invalid username or password' });
      }

      // Set session
      req.session.userId = user.id;

      // Redirect to dashboard
      res.redirect('/dashboard');
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  register: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create(username, email, hashedPassword);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = authController;