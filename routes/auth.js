'use strict';

const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { isGuest } = require('../middleware/authMiddleware');

router.get('/login',    isGuest, AuthController.showLogin);
router.post('/login',   isGuest, AuthController.login);
router.get('/register', isGuest, AuthController.showRegister);
router.post('/register', isGuest, AuthController.register);

router.get('/logout', AuthController.logout);

module.exports = router;
