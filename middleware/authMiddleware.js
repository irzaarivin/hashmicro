'use strict';

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  req.flash && req.flash('error', 'Silakan login terlebih dahulu.');
  res.redirect('/login');
};

const isGuest = (req, res, next) => {
  if (req.session && req.session.userId) {
    return res.redirect('/');
  }
  next();
};

module.exports = { isAuthenticated, isGuest };
