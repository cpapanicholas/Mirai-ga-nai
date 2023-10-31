const inquirer = require('inquirer');
const Database = require('./server');

const db = new Database();
db.connect();

function mainMenu() {
    // Create a main menu using inquirer and handle user choices
}

function viewDepartments() {
    // Query the database to get a list of departments and display them
}

// Implement similar functions for viewing roles, employees, adding departments, adding roles, adding employees, and updating employee roles.

mainMenu();