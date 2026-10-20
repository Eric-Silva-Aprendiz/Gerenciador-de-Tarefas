'use strict';
const bcrypt = require("bcrypt");

/*
name: 'Matheus',
      email: 'Matheus@gmail.com',
      password: senhaCripto,
      tipo: 'administrador',
      createdAt: new Date(),
      updatedAt: new Date(),
*/

/** @type {import('sequelize-cli').Migration} */
module.exports = {  
  async up (queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10, 'a');
    const senhaCripto = await bcrypt.hash('01293wgyds', salt);    

    await queryInterface.bulkInsert('Tasks', [{    
      userId: 217,
      titulo: 'estudar',
      status: "pendente",      
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
    {
      userId: 217,
      titulo: 'detista',
      status: "pendente",                  
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 217,
      titulo: 'correr',
      status: "pendente",                  
      createdAt: new Date(),
      updatedAt: new Date()}], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
