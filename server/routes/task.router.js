const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const query = `SELECT * FROM "taskList" WHERE "user_id" = $1 ORDER BY "taskList".id DESC;`;
  pool.query(query, [req.user.id])
    .then( result => {
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
        `INSERT INTO "taskList" ("taskName", "priority", "user_id")
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
   console.log(req.body.isComplete)
  // Update this single task
  const sqlText = `UPDATE "taskList" SET "taskName" = $1, "priority" = $2, "isComplete" = $3 WHERE id = $4 AND "user_id" = $5; `;
  pool.query(sqlText, [req.body.taskName, req.body.priority, req.body.isComplete, req.body.id, req.user.id])
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
