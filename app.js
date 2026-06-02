'use strict';

require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');
const methodOverride = require('method-override');

const db = require('./config/database');
const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');
const employeeRoutes = require('./routes/employees');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── View Engine ─────────────────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use(session({
  secret: 'mvc-app-secret-key-2024',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 },
}));
app.use(flash());

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  res.locals.sessionUser = req.session.userId
    ? { id: req.session.userId, username: req.session.username, email: req.session.email }
    : null;
  next();
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/', authRoutes);
app.use('/', indexRoutes);
app.use('/employees', employeeRoutes);

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).render('404', { title: 'Halaman Ngga Ada' });
});

// ─── Error Handler ────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { title: 'Server Error', error: err.message });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
async function startServer() {
  await db.testConnection();
  app.listen(PORT, () => {
    console.log(`🚀  Server running at http://localhost:${PORT}`);
    console.log(`📋  Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

startServer();