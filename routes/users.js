import express from "express";
import { getUser, getUsers, newUser } from "../controllers/usersController.js";
const router = express();

router.get("/", getUsers);

router.get("/login/:username", getUser);

router.post("/signup", newUser);

export default router;
