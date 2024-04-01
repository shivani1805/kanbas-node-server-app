//const express = require('express') //require function is equivalent to import keyword
import express from 'express'; //since we added ES6 we can use import
import Hello from "./Hello.js";
import Lab5 from './Lab5.js';
import cors from "cors";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import AssignmentRoutes from './Kanbas/assignments/routes.js';
const app = express(); // create new express instance
app.use(cors());
app.use(express.json());
ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
Lab5(app);
Hello(app);
// app.get('/hello', (req, res) => {res.send('Hello World!')})
// app.get('/hello', (req, res) => {res.send('Life is good!')})
// app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')}) // moved to hello.js
// app.listen(4000);
app.listen(process.env.PORT || 4000);

