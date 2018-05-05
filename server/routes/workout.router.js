const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET previsouly created workouts in DB to view all workouts - displays on View Workout
router.get('/', (req, res) => {
    // console.log('is authenticated?', req.isAuthenticated());
    // console.log('user', req.user);  
    if (req.isAuthenticated()){
        let queryText = `SELECT * FROM "workoutApp"."workout" WHERE user_id = $1;`;
        pool.query(queryText, [req.user.id])
        .then((result)=> {
            // console.log('GET workouts', result.rows);
            res.send(result.rows)
        }).catch((err)=> {
            console.log('ERR in GET /workouts', err);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

//GET workout details for a specific workout - displays on Workout Details
router.get('/detail/:id', (req, res) => {
    // console.log('is authenticated?', req.isAuthenticated());
    // console.log('user', req.user);
    // console.log('workout id:', req.params.id);
    
    if (req.isAuthenticated()){
        let queryText = `SELECT "workoutApp"."exercise"."name","workoutApp"."exercise"."id", "default_sets", "default_reps", 
            "default_weight", "workout_id", "workoutApp"."workout"."name" as "workout_name" FROM "workoutApp"."exercise"
            JOIN "workoutApp"."workout_detail" ON "workoutApp"."exercise"."id" = "workoutApp"."workout_detail"."exercise_id"
            JOIN "workoutApp"."workout" ON "workoutApp"."workout"."id" = "workoutApp"."workout_detail"."workout_id"
            WHERE "workoutApp"."workout"."id" = $1;`;
    pool.query(queryText, [req.params.id])
        .then((result) => {
        // console.log('GET workout details', result.rows);
        res.send(result.rows)
    }).catch((err) => {
        console.log('ERR in GET /detail', err);
        res.sendStatus(500);
    })
    } else {
        res.sendStatus(403);
    }
})// 

//DELETE a workout from the database
router.delete('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        const workoutId = req.params.id;
        let queryText = `DELETE FROM "workoutApp"."workout" WHERE "id" = $1;`;
        pool.query(queryText, [req.params.id])
        .then((response) => {
            res.sendStatus(200);
        }).catch((err) => {
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

// POST new session (completed workout) to database
router.post('/:id', (req, res) => {
  
});

//PUT route - update the details of an exercise during a session
// router.put('/:id', (req, res) => {
//     console.log('PUT request /workout', req.body)
//     let completedExerciseToUpdate = req.body;
//     if (req.isAuthenticated()) {

//     }
// })

module.exports = router;