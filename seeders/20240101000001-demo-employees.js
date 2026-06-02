'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('employees', [
      {
        name: 'Budi Santoso',
        email: 'budi.santoso@company.com',
        position: 'Software Engineer',
        department: 'Engineering',
        salary: 12000000,
        hire_date: '2021-03-15',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Siti Rahayu',
        email: 'siti.rahayu@company.com',
        position: 'Marketing Manager',
        department: 'Marketing',
        salary: 15000000,
        hire_date: '2020-07-01',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Ahmad Fauzi',
        email: 'ahmad.fauzi@company.com',
        position: 'Financial Analyst',
        department: 'Finance',
        salary: 11000000,
        hire_date: '2022-01-10',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Dewi Lestari',
        email: 'dewi.lestari@company.com',
        position: 'HR Specialist',
        department: 'HR',
        salary: 9000000,
        hire_date: '2021-09-20',
        status: 'on_leave',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Riko Pratama',
        email: 'riko.pratama@company.com',
        position: 'Sales Executive',
        department: 'Sales',
        salary: 8500000,
        hire_date: '2023-02-28',
        status: 'inactive',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Nadia Putri',
        email: 'nadia.putri@company.com',
        position: 'Backend Developer',
        department: 'Engineering',
        salary: 13000000,
        hire_date: '2022-06-01',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('employees', null, {});
  },
};
