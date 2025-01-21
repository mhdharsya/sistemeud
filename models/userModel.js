const config = require('../config/database');

const User = {
  findByEmail: async (email) => {
    try {
      let pool = await sql.connect(config);
      let result = await pool.request()
        .input('email', sql.VarChar, email)
        .query('SELECT * FROM Users WHERE email = @email');
      return result.recordset[0];
    } catch (err) {
      console.error('SQL error', err);
      throw err;
    }
  },

  findByUsername: async (username) => {
    try {
      let pool = await sql.connect(config);
      let result = await pool.request()
        .input('username', sql.VarChar, username)
        .query('SELECT * FROM Users WHERE username = @username');
      return result.recordset[0];
    } catch (err) {
      console.error('SQL error', err);
      throw err;
    }
  },

  create: async (username, email, hashedPassword) => {
    try {
      let pool = await sql.connect(config);
      await pool.request()
        .input('username', sql.VarChar, username)
        .input('email', sql.VarChar, email)
        .input('password', sql.VarChar, hashedPassword)
        .query('INSERT INTO Users (username, email, password, created_at) VALUES (@username, @email, @password, GETDATE())');
    } catch (err) {
      console.error('SQL error', err);
      throw err;
    }
  }
};

module.exports = User;