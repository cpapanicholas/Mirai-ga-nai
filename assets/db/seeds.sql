INSERT INTO department (id, name) VALUES
(1, 'HR'),
(2, 'Engineering'),
(3, 'Marketing');

INSERT INTO role (id, title, salary, department_id) VALUES
(1, 'Manager', 80000, 1),
(2, 'Software Engineer', 70000, 2),
(3, 'Marketing Specialist', 60000, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
(1, 'John', 'Doe', 1, NULL),
(2, 'Jane', 'Smith', 2, 1),
(3, 'Bob', 'Johnson', 2, 1);