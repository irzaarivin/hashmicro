'use strict';

const User = require('../models/User');

class AuthController {
  // ══════════════════════════════════════════════════════════════════════════
  // GET /register
  // ══════════════════════════════════════════════════════════════════════════
  static showRegister(req, res) {
    res.render('auth/register', {
      title: 'Daftar Akun',
      errors: [],
      formData: {},
      messages: req.flash ? req.flash() : {},
    });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // POST /register
  // ══════════════════════════════════════════════════════════════════════════
  static async register(req, res) {
    const { username, email, password, password_confirm } = req.body;
    const errors = [];

    if (!username || username.trim().length < 3) {
      errors.push('Username minimal 3 karakter.');
    }
    if (!email || !email.includes('@')) {
      errors.push('Format email tidak valid.');
    }
    if (!password || password.length < 6) {
      errors.push('Password minimal 6 karakter.');
    }
    if (password !== password_confirm) {
      errors.push('Konfirmasi password tidak cocok.');
    }

    if (errors.length > 0) {
      return res.render('auth/register', {
        title: 'Daftar Akun',
        errors,
        formData: { username, email },
        messages: {},
      });
    }

    try {
      const existing = await User.findOne({
        where: { email: email.toLowerCase() },
      });

      if (existing) {
        return res.render('auth/register', {
          title: 'Daftar Akun',
          errors: ['Email sudah terdaftar. Gunakan email lain.'],
          formData: { username, email },
          messages: {},
        });
      }

      const hashedPassword = await User.hashPassword(password);

      await User.create({
        username: username.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
      });

      req.flash && req.flash('success', 'Akun berhasil dibuat. Silakan login.');
      res.redirect('/login');
    } catch (err) {
      const messages = err.errors ? err.errors.map(e => e.message) : [err.message];
      res.render('auth/register', {
        title: 'Daftar Akun',
        errors: messages,
        formData: { username, email },
        messages: {},
      });
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // GET /login
  // ══════════════════════════════════════════════════════════════════════════
  static showLogin(req, res) {
    res.render('auth/login', {
      title: 'Masuk',
      errors: [],
      formData: {},
      messages: req.flash ? req.flash() : {},
    });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // POST /login
  // ══════════════════════════════════════════════════════════════════════════
  static async login(req, res) {
    const { email, password } = req.body;
    const errors = [];

    if (!email || !password) {
      errors.push('Email dan password wajib diisi.');
    }

    if (errors.length > 0) {
      return res.render('auth/login', {
        title: 'Masuk',
        errors,
        formData: { email },
        messages: {},
      });
    }

    try {
      const user = await User.findOne({
        where: { email: email.toLowerCase().trim() },
      });

      if (!user) {
        return res.render('auth/login', {
          title: 'Masuk',
          errors: ['Email atau password salah.'],
          formData: { email },
          messages: {},
        });
      }

      const isValid = await user.verifyPassword(password);

      if (!isValid) {
        return res.render('auth/login', {
          title: 'Masuk',
          errors: ['Email atau password salah.'],
          formData: { email },
          messages: {},
        });
      }

      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.email = user.email;

      req.flash && req.flash('success', `Selamat datang, ${user.username}!`);
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.render('auth/login', {
        title: 'Masuk',
        errors: ['Terjadi kesalahan server. Coba lagi.'],
        formData: { email },
        messages: {},
      });
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // GET /logout
  // ══════════════════════════════════════════════════════════════════════════
  static logout(req, res) {
    req.session.destroy(err => {
      if (err) console.error('Session destroy error:', err);
      res.redirect('/login');
    });
  }
}

module.exports = AuthController;
