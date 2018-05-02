const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET all exercises from DOM to create a new workout
router.get('/', (req, res) => {
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user); 
    if( req.isAuthenticated()){
        let queryText = `SELECT * FROM "exercise" ORDER BY "family", "name";`;
        pool.query(queryText).then((result)=>{
            console.log('GET /exercise', result.rows);
            res.send(result.rows)
        }).catch((err)=>{
            console.log('error in GET /exercise', err);
            res.sendStatus(500);
        })
    } else{
        res.sendStatus(403);
    }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;