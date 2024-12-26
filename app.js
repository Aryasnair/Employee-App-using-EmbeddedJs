const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sample Data
let employees = [
  { id: 1, name: 'John', designation: 'Software Engineer', location: 'New York', salary: 80000 },
  { id: 2, name: 'James', designation: 'Programe Manager', location: 'UK', salary: 400000 },
];

// Routes
app.get('/', (req, res) => res.render('home', { employees }));
app.get('/add', (req, res) => res.render('add'));

app.post('/add', (req, res) => {
  const id = employees.length + 1;
  employees.push({ id, ...req.body, salary: +req.body.salary });
  res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
  let employee;
  // Loop through employees to find the employee with the given ID
  for (let i = 0; i < employees.length; i++) {
    if (employees[i].id == req.params.id) {
      employee = employees[i];
      break;
    }
  }
  res.render('edit', { employee });
});

app.post('/update/:id', (req, res) => {
  for (let i = 0; i < employees.length; i++) {
    if (employees[i].id == req.params.id) {
      // Update the employee at index i
      employees[i] = { id: +req.params.id, ...req.body, salary: +req.body.salary };
      break;
    }
  }
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  // Loop through the employees to find the one to delete
  for (let i = 0; i < employees.length; i++) {
    if (employees[i].id == req.params.id) {
      // Remove the employee by index
      employees.splice(i, 1);
      break;
    }
  }
  res.redirect('/');
});

// Start Server
app.listen(3000, () => {
  console.log("Server is listening on PORT 3000");
});