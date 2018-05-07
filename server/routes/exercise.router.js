const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET all exercises from DOM to create a new workout - displays on Create Workout
router.get('/', (req, res) => {
    // console.log('is authenticated?', req.isAuthenticated());
    // console.log('user', req.user); 
    if( req.isAuthenticated()){
        let queryText = `SELECT * FROM "workoutApp"."exercise" ORDER BY "family", "name";`;
        pool.query(queryText).then((result)=>{
            // console.log('GET /exercise', result.rows);
            res.send(result.rows)
        }).catch((err)=>{
            console.log('error in GET /exercise', err);
            res.sendStatus(500);
        })
    } else{
        res.sendStatus(403);
    }
});

//GET a specific exercise to display on DOM to allow user to update details
router.get('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        let queryText = `SELECT * FROM "workoutApp"."exercise" WHERE "id"=$1;`;
        pool.query(queryText, [req.params.id]).then((result) => {
            // console.log('GET /exercise', result.rows);
            res.send(result.rows)
        }).catch((err) => {
            console.log('error in GET /exercise/:id', err);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

// POST new workout to workout table and then post new exercise to workout_detail table
router.post('/newworkout', (req, res) => {
    // console.log('user', req.user); 
    const newWorkoutDetail = req.body;
    // console.log('newWorkoutDetail', newWorkoutDetail);

    (async () => {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');
                // post new workout to DB and assign new ID
            let queryText = `INSERT INTO "workoutApp"."workout" ("name", "user_id") VALUES ($1, $2) RETURNING "id";`;
            const workoutValues = [newWorkoutDetail.workoutName, req.user.id];
            const workoutResult = await client.query(queryText, workoutValues);
            // console.log('workoutResult', workoutResult);
            const workoutId = workoutResult.rows[0].id;

            //loop through exercises and post to "workout_details" with exerciseID and workoutIF
            for (let exerciseList of newWorkoutDetail.exerciseArray){
           
            if (exerciseList.selected == true) {
                // console.log('exerciseList', exerciseList);
                queryText = `INSERT INTO "workoutApp"."workout_detail" ("workout_id", "exercise_id") VALUES ($1, $2);`;
                await client.query(queryText, [workoutId, exerciseList.id]);
                await client.query('COMMIT');
                } 
            }   
            res.send(workoutResult.rows[0])
        }catch (e) {
            console.log('ROLLBACK', e);
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    })().catch((err) => {
        console.log('CATCH', err);
        res.sendStatus(500);
    });
});//end post

//PUT route - update the default settings for asingle exercise in the DB
router.put('/:id', (req, res) => {
    // console.log('PUT /exercise', req.body)
    let exerciseToUpdate = req.body;
    if (req.isAuthenticated()) {
    let queryText = `UPDATE "workoutApp"."exercise" SET "default_sets" = $1, 
            "default_reps" = $2, "default_weight" = $3 WHERE "id" = $4;`;
        pool.query(queryText, 
            [exerciseToUpdate.default_sets, 
            exerciseToUpdate.default_reps, 
            exerciseToUpdate.default_weight,
            exerciseToUpdate.id])
        .then((result) => {
            // console.log('successful PUT /exercise', result);
            res.send(exerciseToUpdate);
        })
        .catch((err) => {
            console.log('ERROR in PUT /exercise', err);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
})


module.exports = router;