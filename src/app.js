const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

let students = [];
let nextId = 1;

const validate = (b) => b && b.name && b.email && b.course;

app.get('/health', (req, res) => res.json({ status: 'UP' }));

app.get('/students', (req, res) => res.json(students));

app.get('/students/:id', (req, res) => {
  const s = students.find((x) => x.id === Number(req.params.id));
  if (!s) return res.status(404).json({ error: 'Student not found' });
  res.json(s);
});

app.post('/students', (req, res) => {
  if (!validate(req.body)) {
    return res.status(400).json({ error: 'name, email and course are required' });
  }
  const { name, email, course } = req.body;
  const student = { id: nextId++, name, email, course };
  students.push(student);
  res.status(201).json(student);
});

app.put('/students/:id', (req, res) => {
  const s = students.find((x) => x.id === Number(req.params.id));
  if (!s) return res.status(404).json({ error: 'Student not found' });
  const { name, email, course } = req.body || {};
  if (name) s.name = name;
  if (email) s.email = email;
  if (course) s.course = course;
  res.json(s);
});

app.delete('/students/:id', (req, res) => {
  const i = students.findIndex((x) => x.id === Number(req.params.id));
  if (i === -1) return res.status(404).json({ error: 'Student not found' });
  students.splice(i, 1);
  res.status(204).send();
});

app.resetData = () => { students = []; nextId = 1; };

module.exports = app;
