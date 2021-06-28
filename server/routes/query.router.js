const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/spoon', (req, res) => {
    // POST route code here
    console.log(req.body)
    console.log(req.body.spoon)
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
    // POST route code here
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
