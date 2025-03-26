import connection from "../utils/connection.js";
import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

import authorise from "../middleware/auth.js";

const SALT_ROUNDS = 8;

router.post("/register", async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "You must provide a name, email and password" });
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    const sql = `INSERT INTO users
                 SET name = ?, email = ?, password = ?`;

    const [result] = await connection.query(sql, [
      req.body.name,
      req.body.email,
      hashedPassword,
    ]);

    res.status(201).json({ msg: `User created with ID ${result.insertId}` });
  } catch (error) {
    res.status(500).json({ msg: `Couldn't create new user: ${error.message}` });
  }
});

router.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "You must provide an email and password" });
  }

  try {
    const sql = `SELECT *
                     FROM users
                     WHERE email = ?`;

    const [user] = await connection.query(sql, [req.body.email]);

    const result = await bcrypt.compare(req.body.password, user[0].password);

    if (!result) {
      return res
        .status(403)
        .json({ msg: "Username/passsword combination is incorrect" });
    }
    const token = jwt.sign(
      {
        id: user[0].id,
        sub: user[0].email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ authToken: token });
  } catch (error) {
    res.status(400).json({ msg: "User not found" });
  }
});

router.get("/profile", authorise, async (req, res) => {
  try {
    const sql = `SELECT *
                 FROM users
                 WHERE id = ?`;
    const [user] = await connection.query(sql, [req.token.id]);

    res.json(user[0]);
  } catch (error) {
    res.status(500).json({ msg: "Can't fetch user profile" });
  }
});

router.delete("/:id", authorise, async (req, res) => {
  const userId = req.token.id;

  const sql = `DELETE FROM users where users.id = ?`;

  try {
    const [results] = await connection.query(sql, [userId]);

    if (results.affectedRows === 0) {
      res.status(404).json({ msg: `No user with ID ${userId} found` });
    }
    res.json({ msg: `User with ID ${userId} has been deleted` });
    res.status(204).end();
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
