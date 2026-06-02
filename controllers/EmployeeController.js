'use strict';

const Employee = require('../models/Employee');
const { Op } = require('sequelize');

class EmployeeController {
  
  static async index(req, res) {
    try {
      const { search, department, status } = req.query;

      const where = {};

      if (search) {
        where[Op.or] = [
          { name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
          { position: { [Op.like]: `%${search}%` } },
        ];
      }

      if (department) where.department = department;
      if (status) where.status = status;

      const employees = await Employee.findAll({
        where,
        order: [['created_at', 'DESC']],
      });

      const stats = Employee.computeStats(employees);

      res.render('employees/index', {
        title: 'Daftar Karyawan',
        employees,
        stats,
        departments: Employee.getDepartments(),
        statuses: Employee.getStatuses(),
        filters: { search: search || '', department: department || '', status: status || '' },
        messages: req.flash ? req.flash() : {},
      });
    } catch (err) {
      console.error(err);
      req.flash && req.flash('error', 'Gagal memuat data karyawan.');
      res.redirect('/');
    }
  }

  static async show(req, res) {
    try {
      const employee = await Employee.findByPk(req.params.id);

      if (!employee) {
        req.flash && req.flash('error', 'Karyawan tidak ditemukan.');
        return res.redirect('/employees');
      }

      res.render('employees/show', {
        title: `Detail: ${employee.getDisplayName()}`,
        employee,
        messages: req.flash ? req.flash() : {},
      });
    } catch (err) {
      console.error(err);
      res.redirect('/employees');
    }
  }

  static async create(req, res) {
    res.render('employees/form', {
      title: 'Tambah Karyawan',
      employee: null,
      departments: Employee.getDepartments(),
      statuses: Employee.getStatuses(),
      errors: [],
      messages: req.flash ? req.flash() : {},
    });
  }

  static async store(req, res) {
    try {
      const { name, email, position, department, salary, hire_date, status } = req.body;

      await Employee.create({ name, email, position, department, salary, hire_date, status });

      req.flash && req.flash('success', `Karyawan "${name}" berhasil ditambahkan.`);
      res.redirect('/employees');
    } catch (err) {
      const errors = err.errors ? err.errors.map(e => e.message) : [err.message];
      res.render('employees/form', {
        title: 'Tambah Karyawan',
        employee: req.body,
        departments: Employee.getDepartments(),
        statuses: Employee.getStatuses(),
        errors,
        messages: {},
      });
    }
  }

  static async edit(req, res) {
    try {
      const employee = await Employee.findByPk(req.params.id);

      if (!employee) {
        req.flash && req.flash('error', 'Karyawan tidak ditemukan.');
        return res.redirect('/employees');
      }

      res.render('employees/form', {
        title: `Edit: ${employee.getDisplayName()}`,
        employee,
        departments: Employee.getDepartments(),
        statuses: Employee.getStatuses(),
        errors: [],
        messages: req.flash ? req.flash() : {},
      });
    } catch (err) {
      res.redirect('/employees');
    }
  }

  static async update(req, res) {
    try {
      const employee = await Employee.findByPk(req.params.id);

      if (!employee) {
        req.flash && req.flash('error', 'Karyawan tidak ditemukan.');
        return res.redirect('/employees');
      }

      const { name, email, position, department, salary, hire_date, status } = req.body;
      await employee.update({ name, email, position, department, salary, hire_date, status });

      req.flash && req.flash('success', `Karyawan "${name}" berhasil diperbarui.`);
      res.redirect('/employees');
    } catch (err) {
      const errors = err.errors ? err.errors.map(e => e.message) : [err.message];
      const employee = { ...req.body, id: req.params.id };
      res.render('employees/form', {
        title: 'Edit Karyawan',
        employee,
        departments: Employee.getDepartments(),
        statuses: Employee.getStatuses(),
        errors,
        messages: {},
      });
    }
  }

  static async destroy(req, res) {
    try {
      const employee = await Employee.findByPk(req.params.id);

      if (!employee) {
        req.flash && req.flash('error', 'Karyawan tidak ditemukan.');
        return res.redirect('/employees');
      }

      const name = employee.getDisplayName();
      await employee.destroy();

      req.flash && req.flash('success', `Karyawan "${name}" berhasil dihapus.`);
      res.redirect('/employees');
    } catch (err) {
      console.error(err);
      req.flash && req.flash('error', 'Gagal menghapus karyawan.');
      res.redirect('/employees');
    }
  }
}

module.exports = EmployeeController;
