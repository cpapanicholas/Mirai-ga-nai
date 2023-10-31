const mysql = require('mysql');
const inquirer = require('inquirer');

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'your_database_host',
      user: 'your_username',
      password: 'your_password',
      database: 'your_database_name'
    });
  }

  connect() {
    this.connection.connect((err) => {
      if (err) throw err;
      console.log('Connected to MySQL database');
    });
  }

  disconnect() {
    this.connection.end((err) => {
      if (err) throw err;
      console.log('Disconnected from MySQL database');
    });
  }

  // Implement functions to perform specific SQL queries here
  function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter the name of the department:',
            },
        ])
        .then((answers) => {
            // Call the corresponding database function to add the department.
        });
};

function addEmployee() {
  inquirer
      .prompt([
          {
              type: 'input',
              name: 'name',
              message: 'Enter the name of the Employee:',
          },
      ])
      .then((answers) => {
          // Call the corresponding database function to add the department.
      });
}



}

module.exports = Database;