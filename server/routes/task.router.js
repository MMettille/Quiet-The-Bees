const express = require("express");
const { rejectUnauthenticated } = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET routes
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  // ⬇ This will grab everything we need to start displaying tasks
  const query = `
    SELECT "taskList".id, "taskName", "isComplete", "color_id", "taskList".user_id, "color_list".color_name from "color_list"
    JOIN "taskList"
    ON "color_list".id = "taskList".color_id
    WHERE "taskList".user_id = $1
    ORDER BY "taskList".id DESC;`;
  pool
    .query(query, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all tasks", err);
      res.sendStatus(500);
    });
});

router.get("/category", rejectUnauthenticated, (req, res) => {
  // ⬇ This will update the category in question
  const query = `
  SELECT "custom_names".id, "color_id", "category", "isChecked", "color_name"  from "custom_names" 
  JOIN "color_list"
  ON "color_list".id = "custom_names".color_id
  WHERE "color_id" >= 4 AND "user_id" = $1
  ORDER BY "id" ASC;
    `;
  pool
    .query(query, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all categories", err);
      res.sendStatus(500);
    });
});

/**
 * POST route
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  // ⬇ This will post a task into the taskList table
  const insertNewTask = `INSERT INTO "taskList" ("taskName", "color_id", "user_id")
        VALUES ($1, $2, $3);`;
  pool
    .query(insertNewTask, [req.body.taskName, req.body.color_id, req.user.id])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

/**
 * PUT routes
 */
router.put("/category/:id", rejectUnauthenticated, (req, res) => {
  // ⬇ This will update this single task
  const sqlText = `UPDATE "custom_names" SET "category" = $1 WHERE id = $2 AND "user_id" = $3;`;
  pool
    .query(sqlText, [
      req.body.category,
      req.body.id,
      req.user.id,
    ])
    // ⬇ Sending back a 'ok' code to the user
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error making database query ${sqlText}`, error);
      res.sendStatus(500);
    });
});

/**
 * PUT route
 */
 router.put("/:id", rejectUnauthenticated, (req, res) => {
  // ⬇ This will update this single task
  const sqlText = `UPDATE "taskList" SET "taskName" = $1, "color_id" = $2, "isComplete" = $3 WHERE id = $4 AND "user_id" = $5;`;
  pool
    .query(sqlText, [
      req.body.taskName,
      req.body.color_id,
      req.body.isComplete,
      req.body.id,
      req.user.id,
    ])
    // ⬇ Sending back a 'ok' code to the user
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error making database query ${sqlText}`, error);
      res.sendStatus(500);
    });
});

/**
 * DELETE route
 */
router.delete("/delete/:id", rejectUnauthenticated, (req, res) => {
  // ⬇ This will grab the id of the task that we would like to delete
  const taskToDelete = req.params.id;
  console.log(taskToDelete);
  // ⬇ This tell the database what we'd like to delete and where
  const queryText = `DELETE FROM "taskList" WHERE "taskList".id = $1 AND "user_id" = $2;`;
  // ⬇ Delete sanitized user input from the database
  pool
    .query(queryText, [taskToDelete, req.user.id])
    // ⬇ Sending back a 'ok' code to the user
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`error deleting on server side`);
      res.sendStatus(500);
    });
});

module.exports = router;
