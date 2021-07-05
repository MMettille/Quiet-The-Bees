const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const query = `
    SELECT "taskList".id, "taskName", "isComplete", "priority_id", "isActive", "priority_task_category".category_name, "taskList".user_id, "priority_list".color_name from "priority_list"
    JOIN "taskList"
    ON "priority_list".id = "taskList".priority_id
    JOIN "priority_task_category"
    on "taskList".user_id = "priority_task_category".user_id
    WHERE "taskList".user_id = $1
    ORDER BY "taskList".id DESC;`;
  pool.query(query, [req.user.id])
    .then( result => {
      console.log('tasks from the database', result.rows)
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all tasks', err);
      res.sendStatus(500)
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
    console.log(req.body)
    const insertNewTask = 
        `INSERT INTO "taskList" ("taskName", "priority_id", "user_id")
        VALUES ($1, $2, $3);`;
    pool.query(insertNewTask, [req.body.taskName, req.body.priority, req.user.id]).then(result => {
        res.sendStatus(201);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500)
    })
});

/**
 * PUT route template
 */
 router.put('/:id', (req, res) => {
   console.log('req.body',req.body)
   console.log('req.body.taskName',req.body.taskName)
   console.log('req.body.priority_id',req.body.priority_id)
   console.log('req.body.isComplete',req.body.isComplete)
   console.log('req.body.id',req.body.id)
   console.log('req.user.id',req.user.id)
  // Update this single task
  const sqlText = `UPDATE "taskList" SET "taskName" = $1, "priority_id" = $2, "isComplete" = $3 WHERE id = $4 AND "user_id" = $5;`;
  pool.query(sqlText, [req.body.taskName, req.body.priority_id, req.body.isComplete, req.body.id, req.user.id])
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
 * DELETE route template
 */
 router.delete('/delete/:id', (req, res) => {
  // ⬇ This will grab the id of the task that we would like to delete
  const taskToDelete = req.params.id;
  console.log(taskToDelete)
  // ⬇ This tell the database what we'd like to delete and where
  const queryText = `DELETE FROM "taskList" WHERE "taskList".id = $1 AND "user_id" = $2;`;
  // ⬇ Delete sanitized user input from the database
  pool.query(queryText, [taskToDelete, req.user.id])
  // ⬇ Sending back a 'ok' code to the user
  .then( response => {
      console.log(`You deleted...`, taskToDelete);
      res.sendStatus(200);
  }).catch( err => {
      console.log(`error deleting on server side`);
      res.sendStatus(500);
  });
});

module.exports = router;
