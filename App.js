//const express = require('express') //require function is equivalent to import keyword
import express from 'express'; //since we added ES6 we can use import
import Hello from "./Hello.js";
import mongoose from "mongoose";
import "dotenv/config";
import session from "express-session";
import Lab5 from './Lab5.js';
import cors from "cors";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import AssignmentRoutes from './Kanbas/assignments/routes.js';
import UserRoutes from "./Users/routes.js";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose.connect(CONNECTION_STRING);

const app = express(); // create new express instance
app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_URL
    })
   );
  
   const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  };


  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: process.env.HTTP_SERVER_DOMAIN,
    };
  }
app.use(session(sessionOptions));
app.use(express.json());
ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
UserRoutes(app);
Lab5(app);
Hello(app);
// app.get('/hello', (req, res) => {res.send('Hello World!')})
// app.get('/hello', (req, res) => {res.send('Life is good!')})
// app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')}) // moved to hello.js
// app.listen(4000);

app.listen(process.env.PORT || 4000);

