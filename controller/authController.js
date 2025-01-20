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

      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
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

module.exports = authController;