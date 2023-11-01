const inquirer = require('inquirer');
const Database = require('./server');

const db = new Database();
db.connect();

function mainMenu() {
    // Create a main menu using inquirer and handle user choices
    inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
        ],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        default:
          console.log('Invalid choice');
          break;
      }
    });
}

    // Query the database to get a list of departments and display them
    function viewDepartments() {
        const query = 'SELECT * FROM department';
        db.connection.query(query, (err, results) => {
          if (err) throw err;
      
          console.log('\nDepartments:\n');
          console.table(results);
      
          // Return to the main menu
          mainMenu();
        });
      }

      function viewRoles() {
        const query = 'SELECT * FROM role';
        db.connection.query(query, (err, results) => {
          if (err) throw err;
      
          // Format and display the role data in a table
          console.log('\nRoles:\n');
          console.table(results);
      
          // Return to the main menu
          mainMenu();
        });
      }

      function viewRoles() {
        const query = 'SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id';
        db.connection.query(query, (err, results) => {
          if (err) throw err;
      
          // Format and display the role data in a table
          console.log('\nRoles:\n');
          console.table(results);
      
          // Return to the main menu
          mainMenu();
        });
      }


// Implement similar functions for viewing roles, employees, adding departments, adding roles, adding employees, and updating employee roles.

mainMenu();