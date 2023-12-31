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
      db.createDepartment(answers.name)
        .then(() => console.log(`Added ${answers.name} to the database`))
        .then(() => startPrompt());
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

      if (isNaN(role.department_id)) {
        console.log('Invalid department ID. Please enter a valid department ID.');
        startPrompt();
        return;
      }

      // Remove the 'id' field from the role object
      delete role.id;

      // Define the columns and values for the INSERT statement
      const columns = Object.keys(role).join(', '); // Get column names
      const values = Object.values(role); // Get values

      // Insert the new role into the database
      const query = `INSERT INTO role (${columns}) VALUES (?)`;
      db.connection.query(query, [values], (err, result) => {
        if (err) {
          console.log('Error:', err);
        } else {
          console.log(`Role "${answers.title}" added.`);
        }
        startPrompt(); // Return to the main menu
      });
    });
}


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
      // {
      //   type: 'input',
      //   name: 'manager_id',
      //   message: 'Enter the manager ID of the Employee (if any):',
      // },
    ])
    .then((answers) => {
      // Call the corresponding database function to add the employee.
      const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
      db.connection.query(
        query,
        [answers.first_name, answers.last_name, answers.role_id, answers.manager_id],
        (err, results) => {
          if (err) throw err;
          console.log(`Employee ${answers.first_name} ${answers.last_name} added.`);
          startPrompt();
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
  // Fetch a list of employees and roles to provide choices to the user.
  Promise.all([db.findAllEmployees(), db.findAllRoles()])
    .then(([employee, roles]) => {
      const employeeChoices = employee[0].map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      }));
      const roleChoices = roles[0].map((role) => ({
        name: role.title,
        value: role.id,
      }));

      inquirer
        .prompt([
          {
            type: 'list',
            name: 'employeeId',
            message: 'Select the employee to update:',
            choices: employeeChoices,
          },
          {
            type: 'list',
            name: 'roleId',
            message: 'Select the new role for the employee:',
            choices: roleChoices,
          },
        ])
        .then((answers) => {
          const employeeId = answers.employeeId;
          const roleId = answers.roleId;

          // Update the employee's role in the database.
          db.updateEmployeeRole(employeeId, roleId)
            .then(() => {
              console.log('Employee role updated successfully.');
              startPrompt(); // Return to the main menu
            })
            .catch((err) => {
              console.error('Error updating employee role:', err);
              startPrompt(); // Return to the main menu
            });
        });
    });
}




