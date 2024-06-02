import express from "express";
import {
  getUser,
  getUsers,
  newUser,
  deleteUser,
} from "../controllers/usersController.js";
const router = express();

router.get("/", getUsers);

router.post("/login/", getUser);

router.post("/signup", newUser);

router.delete("/deleteUser/:user", deleteUser);

export default router;
