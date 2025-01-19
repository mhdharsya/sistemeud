const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// Login route
router.post('/login', authController.login);

// Registration route (if needed in the future)
router.post('/register', authController.register);

module.exports = router;