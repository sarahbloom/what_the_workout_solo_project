const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET workouts in DB to view all workouts
router.get('/', (req, res) => {
    // console.log('is authenticated?', req.isAuthenticated());
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
    }
});// end GET all workouts

//GET workout details for a specific workout
router.get('/detail/:id', (req, res)=>{
    // console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    console.log('workout id:', req.params.id);
    
    if (req.isAuthenticated()){
        let queryText = `SELECT "exercise"."name", "default_sets", "default_reps", "default_weight", "workout"."name" as "workout_name" FROM "exercise"
	JOIN "workout_detail" ON "exercise"."id" = "workout_detail"."exercise_id"
	JOIN "workout" ON "workout"."id" = "workout_detail"."workout_id"
    WHERE "workout"."id" = $1;`;
    pool.query(queryText, [req.params.id])
        .then((result)=>{
        console.log('GET workout details', result.rows);
        res.send(result.rows)
    }).catch((err)=>{
        console.log('ERR in GET /detail', err);
        res.sendStatus(500);
    })
    } else {
        res.sendStatus(403);
    }
})// end GET workout details

//POST new workout to database
router.post('/', (req, res) => {

});

module.exports = router;