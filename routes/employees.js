'use strict';

const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/EmployeeController');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.use(isAuthenticated);

router.get('/',         EmployeeController.index);
router.get('/create',   EmployeeController.create);
router.post('/',        EmployeeController.store);
router.get('/:id',      EmployeeController.show);
router.get('/:id/edit', EmployeeController.edit);
router.put('/:id',      EmployeeController.update);
router.delete('/:id',   EmployeeController.destroy);

module.exports = router;