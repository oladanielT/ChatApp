import express from "express";

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send("Signup Endpoint");
});

router.get("/login", (req, res) => {
  res.send("Login Endpoint");
});

router.get("/update", (req, res) => {
  res.send("Update endpoint");
});

export default router;
