const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    findAllDepartments() {
        return this.connection.promise().query(
            "SELECT department.id, department.name FROM department"
        )
    }

    findAllRoles() {
        return this.connection.promise().query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id"
        )
    }

    createDepartment(name) {
        return this.connection.promise().query(
            "INSERT INTO department (name) VALUES (?)",
            [name]
        );
    }
    findAllEmployees() {
        return this.connection.promise().query(
            "SELECT * FROM employee"
        );
    }
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query(
            'UPDATE employees SET role_id = ? WHERE id = ?',
            [roleId, employeeId]
        );
    }
}

module.exports = new DB(connection)