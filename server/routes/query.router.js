const { Table } = require('@material-ui/core');
const { SmsFailedSharp } = require('@material-ui/icons');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET routes
 */
router.get('/spoon', (req, res) => {
    // ⬇ This will get the spoon input by todays date.
    const sqlText = `
        SELECT "spoon_input".spoon FROM "spoon_input"
        WHERE "spoon_input".user_id = $1
        AND "spoon_input".date = $2;`
    pool.query(sqlText, [req.user.id, req.query.q]).then( (result) =>{
        res.send(result.rows);
      }).catch((error)=>{
        console.log(`error making database query`, error);
              res.sendStatus(500);
    });
});

router.get('/spoongraph', (req, res) => {
    // ⬇ This will get the data for the spoon graph
    const sqlText = `
        SELECT "spoon_input".spoon, "spoon_input".date FROM "spoon_input"
        WHERE "spoon_input".user_id = $1
        ORDER BY "spoon_input".date ASC;`
    pool.query(sqlText, [req.user.id]).then( (result) =>{
        res.send(result.rows);
      }).catch((error)=>{
        console.log(`error making database query`, error);
        res.sendStatus(500);
    });
});

router.get('/wordcloud', (req, res) => {
    // ⬇ This will get the data for the word cloud
    const sqlText = `
        SELECT trigger AS tag,
        COUNT(trigger) AS weight
        FROM "trigger_input"
        WHERE "trigger_input".user_id = $1
        GROUP BY "trigger"`
    pool.query(sqlText, [req.user.id]).then( (result) =>{
        res.send(result.rows);
      }).catch((error)=>{
        console.log(`error making database query`, error);
        res.sendStatus(500);
    });
});

router.get('/trigger', (req, res) => {
    // ⬇ This will get the trigger input(s) by todays date.
    console.log('date from /trigger get request', req.query.q)
    const sqlText = `
        SELECT "trigger_input".trigger FROM "trigger_input"
        WHERE "trigger_input".user_id = $1
        AND "trigger_input".date = $2;`
    pool.query(sqlText, [req.user.id, req.query.q]).then( (result) =>{
        res.send(result.rows);
      }).catch((error)=>{
        console.log(`error making database query`, error);
              res.sendStatus(500);
    });
  });

/**
 * POST routes
 */
router.post('/spoon', (req, res) => {
    // ⬇ This will post the user's spoon into the spoon_input table
    const insertSpoonQuery = `
        INSERT INTO "spoon_input" ("spoon", "user_id")
        VALUES ($1, $2)`;
    pool.query(insertSpoonQuery, [req.body.spoon, req.user.id]).then(result => {
        res.sendStatus(201);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500)
    })
});

router.post('/trigger', async (req, res) => {
    // ⬇ This was a really fun one to make! An async/await function that will loop through our array of
    // triggers and inset each into the trigger input Table. If one query fails, they all do an are rolledback
    const array = req.body;
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN');
        for(let item of array){
                const insertTriggerQuery = `
                INSERT INTO "trigger_input" ("trigger", "user_id")
                VALUES ($1, $2)`;
                await connection.query(insertTriggerQuery, [item.trigger, req.user.id])
        }
                await connection.query('COMMIT');
                res.sendStatus(200);
    } catch (error) {
        await connection.query('ROLLBACK')
        console.log(`Error adding triggers - Rolling back transfer`, error);
        res.sendStatus(500); 
    } finally {
        connection.release()
    }
});

module.exports = router;
