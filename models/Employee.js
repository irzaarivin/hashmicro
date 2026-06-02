'use strict';

const { BaseModel, sequelize, DataTypes } = require('./BaseModel');

class Employee extends BaseModel {
  static getLabel() {
    return 'Karyawan';
  }

  static getDisplayFields() {
    return ['name', 'position', 'department', 'salary', 'status'];
  }

  getDisplayName() {
    return this.name || `Employee #${this.id}`;
  }

  getFormattedSalary() {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(this.salary);
  }

  isActive() {
    return this.status === 'active';
  }

  static getDepartments() {
    return ['Engineering', 'Marketing', 'Finance', 'HR', 'Operations', 'Sales'];
  }

  static getStatuses() {
    return ['active', 'inactive', 'on_leave'];
  }

  static computeStats(employees) {
    const deptMap = {};

    for (let i = 0; i < employees.length; i++) {
      const emp = employees[i];

      if (!deptMap[emp.department]) {
        deptMap[emp.department] = { count: 0, totalSalary: 0, active: 0 };
      }

      deptMap[emp.department].count++;
      deptMap[emp.department].totalSalary += Number(emp.salary);

      if (emp.status === 'active') {
        deptMap[emp.department].active++;
      }
    }

    const departments = [];
    for (const dept in deptMap) {
      const d = deptMap[dept];
      departments.push({
        name: dept,
        count: d.count,
        avgSalary: d.count > 0 ? Math.round(d.totalSalary / d.count) : 0,
        activeRate: d.count > 0 ? Math.round((d.active / d.count) * 100) : 0,
      });
    }

    const totalSalary = employees.reduce((sum, e) => sum + Number(e.salary), 0);
    const avgSalary = employees.length > 0 ? Math.round(totalSalary / employees.length) : 0;
    const activeCount = employees.filter(e => e.status === 'active').length;
    const activeRate = employees.length > 0
      ? Math.round((activeCount / employees.length) * 100)
      : 0;

    return {
      total: employees.length,
      activeCount,
      activeRate,
      avgSalary,
      totalSalary,
      departments,
    };
  }
}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: { notEmpty: { msg: 'Nama tidak boleh kosong' } },
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'Format email tidak valid' },
        notEmpty: { msg: 'Email tidak boleh kosong' },
      },
    },
    position: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: { notEmpty: { msg: 'Posisi tidak boleh kosong' } },
    },
    department: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    salary: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
      validate: {
        isDecimal: { msg: 'Gaji harus berupa angka' },
        min: { args: [0], msg: 'Gaji tidak boleh negatif' },
      },
    },
    hire_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: 'active',
      validate: {
        isIn: {
          args: [['active', 'inactive', 'on_leave']],
          msg: 'Status tidak valid',
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'Employee',
    tableName: 'employees',
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

module.exports = Employee;