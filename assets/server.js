const db = require("./db")
const inquirer = require('inquirer');

startPrompt();
// Implement functions to perform specific SQL queries here
function startPrompt() {
  inquirer.prompt([
    {
      type: "list",
      message: "Choose a desired function",
      name: "choice",
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
      ]
    }
  ]).then(function (answers) {
    let choice = answers.choice;
    console.log(choice);
    switch (choice) {
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
  })
};

// Query the database to get a list of departments and display them
function viewDepartments() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.table(departments)
    })
    .then(() => startPrompt())
};

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
      let name = answers;
      db.createDepartment(name)
        .then(() => console.log(`Added ${name.name} to the database`))
        .then(() => startPrompt())
      // const query = 'INSERT INTO department (name) VALUES (?)';
      // db.connection.query(query, [answers.name], (err, results) => {
      //   if (err) throw err;
      //   console.log(`Department ${answers.name} added.`);
      // });
    });
};

function addRole() {
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
};

function addEmployee() {
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
};

function viewEmployees() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.table(employees)
    })
    .then(() => startPrompt())

};

function viewRoles() {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.table(roles)
    })
    .then(() => startPrompt())
};

function updateEmployeeRole() {

}




