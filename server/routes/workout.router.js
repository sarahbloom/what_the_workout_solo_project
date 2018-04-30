const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET route template

router.get('/', (req, res) => {
    console.log('/ workout GET view workouts');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);  
    if (req.isAuthenticated()){
        let queryText = `SELECT * FROM "workout" WHERE user_id = $1;`;
        pool.query(queryText, [req.user.id])
        .then((result)=>{
            console.log('GET workouts', result.rows);
            res.send(result.rows)
        }).catch((err)=>{
            console.log('ERR in GET /workouts', err);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
        //TODO: add alert box
    }
});

//POST route template
router.post('/', (req, res) => {

});

module.exports = router;