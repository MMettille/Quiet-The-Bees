const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register", rejectUnauthenticated, async (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const connection = await pool.connect();
  try {
    await connection.query("BEGIN");
    const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
    const result = await connection.query(queryText, [username, password]);
    const newUser = result.rows[0].id;
    //Adding rows to "custom_names"
    const colorFour = `INSERT INTO "custom_names" (color_id, user_id) VALUES ($1, $2);`;
    await connection.query(colorFour, [4, newUser]);
    const colorFive = `INSERT INTO "custom_names" (color_id, user_id) VALUES ($1, $2);`;
    await connection.query(colorFive, [5, newUser]);
    const colorSix = `INSERT INTO "custom_names" (color_id, user_id) VALUES ($1, $2);`;
    await connection.query(colorSix, [6, newUser]);
    const colorSeven = `INSERT INTO "custom_names" (color_id, user_id) VALUES ($1, $2);`;
    await connection.query(colorSeven, [7, newUser]);
    const colorEight = `INSERT INTO "custom_names" (color_id, user_id) VALUES ($1, $2);`;
    await connection.query(colorEight, [8, newUser]);
    const colorNine = `INSERT INTO "custom_names" (color_id, user_id) VALUES ($1, $2);`;
    await connection.query(colorNine, [9, newUser]);
    const colorTen = `INSERT INTO "custom_names" (color_id, user_id) VALUES ($1, $2);`;
    await connection.query(colorTen, [10, newUser]);
    //Committing all of the posts
    await connection.query("COMMIT");
    res.sendStatus(200);
  } catch (error) {
    await connection.query("ROLLBACK");
    console.log(`Error adding newUser - Rolling back transfer`, error);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
