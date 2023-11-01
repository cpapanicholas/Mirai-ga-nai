const mysql = require('mysql2');
const inquirer = require('inquirer');

// class Database {
//   constructor() {
//     this.connection = mysql.createConnection({
//       host: 'localhost',
//       user: 'root',
//       password: 'root',
//       database: 'employeetrckr_db;'
//     });
//   }

//   connect() {
//     this.connection.connect((err) => {
//       if (err) throw err;
//       console.log('Connected to MySQL database');
//     });
//   }

//   disconnect() {
//     this.connection.end((err) => {
//       if (err) throw err;
//       console.log('Disconnected from MySQL database');
//     });
//   }

  // Implement functions to perform specific SQL queries here

  addDepartment() {
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
        const query = 'INSERT INTO departments (name) VALUES (?)';
        db.connection.query(query, [answers.name], (err, results) => {
          if (err) throw err;
          console.log(`Department ${answers.name} added.`);
        });
      });
  }
  addRole() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the title of the role:',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the salary for the role:',
        },
        {
          type: 'input',
          name: 'department_id',
          message: 'Enter the department ID for the role:',
        },
      ])
      .then((answers) => {
        const role = {
          title: answers.title,
          salary: parseFloat(answers.salary), // Ensure salary is a number
          department_id: parseInt(answers.department_id), // Ensure department_id is a number
        };

        // Insert the new role into the database
        const query = 'INSERT INTO role SET ?';
        db.connection.query(query, role, (err, result) => {
          if (err) throw err;

          console.log(`Role "${answers.title}" added.`);
          mainMenu(); // Return to the main menu
        });
      });
  }

  addEmployee() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'first_name',
          message: 'Enter the first name of the Employee:',
        },
        {
          type: 'input',
          name: 'last_name',
          message: 'Enter the last name of the Employee:',
        },
        {
          type: 'input',
          name: 'role_id',
          message: 'Enter the role ID of the Employee:',
        },
        {
          type: 'input',
          name: 'manager_id',
          message: 'Enter the manager ID of the Employee (if any):',
        },
      ])
      .then((answers) => {
        // Call the corresponding database function to add the employee.
        const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        db.connection.query(
          query,
          [answers.first_name, answers.last_name, answers.role_id, answers.manager_id],
          (err, results) => {
            if (err) throw err;
            console.log(`Employee ${answers.first_name} ${answers.last_name} added.`);
          }
        );
      });
  }
//}


module.exports = Database;