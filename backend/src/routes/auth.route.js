import express from "express";
import { login, signup, update } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/update", update);

export default router;
