'use strict';

const express = require('express');
const router = express.Router();
const CheckerController = require('../controllers/CheckerController');
const HomeController = require('../controllers/HomeController');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.get('/', isAuthenticated, HomeController.index);

router.get('/checker',  isAuthenticated, CheckerController.index);
router.post('/checker', isAuthenticated, CheckerController.check);

module.exports = router;