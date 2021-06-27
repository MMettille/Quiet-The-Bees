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

router.post('/trigger', (req, res) => {
    // POST route code here
    const array = req.body;
    // This works, but the app crashs with an error of Cannot set headers after they are sent to the client
    //! Why is it allowing me to do this>?
    //TODO Research this!
    for(let item of array){
            const insertTriggerQuery = `
            INSERT INTO "trigger_input" ("trigger", "user_id")
            VALUES ($1, $2)`;
        pool.query(insertTriggerQuery, [item.trigger, req.user.id]).then(result => {
            res.sendStatus(201);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500)
        })
    }
});

module.exports = router;
