import express from "express";
import { getUser, getUsers, newUser } from "../controllers/usersController.js";
const router = express();

router.get("/", getUsers);

router.get("/:username", getUser);

router.post("/", newUser);

export default router;
