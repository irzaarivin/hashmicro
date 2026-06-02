'use strict';

const Employee = require('../models/Employee');

class HomeController {
  static async index(req, res) {
    try {
      const employees = await Employee.findAll();
      const stats = Employee.computeStats(employees);

      res.render('home', {
        title: 'Dashboard',
        stats,
        messages: req.flash ? req.flash() : {},
      });
    } catch (err) {
      res.render('home', {
        title: 'Dashboard',
        stats: { total: 0, activeCount: 0, activeRate: 0, avgSalary: 0, departments: [] },
        messages: {},
      });
    }
  }
}

module.exports = HomeController;
