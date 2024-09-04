import session from "express-session";
import * as dao from "./dao.js";
let currentUser = null;
export default function UserRoutes(app) {

  const deleteUser = async (req, res) => { 
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);

  };
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);

   };
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    currentUser = await dao.findUserById(userId);
    res.json(status);
  };

  const signin = async (req, res) => { 
    const { username, password } = req.body;
   
    const currentUser = await dao.findUserByCredentials(username, password);
    
    if (currentUser!==null || currentUser!==undefined) {
      req.session.currentUser = currentUser;
      console.log("signin session",req.session);
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.json(currentUser);
    } else {
      res.sendStatus(401);
    }
  };

  const profile = async (req, res) => {
    const currentUser = req.session.currentUser;
     console.log("profile session", req.session);
     if(!currentUser){
 //   if (currentUser===null || currentUser===undefined) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  const findAllUsers = async (req, res) => {
    const { role } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }

    const users = await dao.findAllUsers();
    res.json(users);
  };
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };
  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already taken" });
    }
    const currentUser = await dao.createUser(req.body);
    if (currentUser) {
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
      } else {
        res.sendStatus(401);
      }
  
  };
  const signout = (req, res) => {
    // currentUser=null;
    req.session.destroy();
    res.sendStatus(200);
  };
  app.post("/api/users/signout", signout);

  app.post("/api/users/signup", signup);
  app.post("/api/users", createUser);

  app.get("/api/users", findAllUsers);

  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signin", signin);
  app.post("/api/users/profile", profile);
  
}

