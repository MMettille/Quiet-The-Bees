const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const query = `SELECT * FROM "taskList" WHERE "user_id" = $1;`;
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
});

/**
 * PUT route template
 */
 router.put('/:id', (req, res) => {
  console.log(req.params)
  console.log(req.body)
  // Update this single title
  const sqlText = `UPDATE "taskList" SET "taskName" = $1 WHERE id = $2 AND "user_id" = $3; `;
  pool.query(sqlText, [req.body.item.taskName, req.body.item.id, req.user.id])
      .then((result) => {
          res.sendStatus(200);
      })
      .catch((error) => {
          console.log(`Error making database query ${sqlText}`, error);
          res.sendStatus(500);
      });
});

module.exports = router;
