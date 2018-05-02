const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET all exercises from DOM to create a new workout
router.get('/', (req, res) => {
    // console.log('is authenticated?', req.isAuthenticated());
    // console.log('user', req.user); 
    if( req.isAuthenticated()){
        let queryText = `SELECT * FROM "exercise" ORDER BY "family", "name";`;
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


// POST new workout to workout table and then post new exercise to workout_detail table
router.post('/newworkout', (req, res) => {
    console.log('user', req.user); 
    const newWorkoutDetail = req.body;
    // console.log('newWorkoutDetail', newWorkoutDetail);

    (async () => {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            let queryText = `INSERT INTO "workout" ("name", "user_id") VALUES ($1, $2) RETURNING "id";`;
            const workoutValues = [newWorkoutDetail.workoutName, req.user.id];
            const workoutResult = await client.query(queryText, workoutValues);
            console.log('workoutResult', workoutResult);
            
            // id of the newly inserted address
            const workoutId = workoutResult.rows[0].id;

            
            for (let exerciseList of newWorkoutDetail.exerciseArray){
            // newWorkoutDetail.exerciseArray.forOf((exerciseList) => { 
            //     console.log('exerciseList', exerciseList);
                
                // return exerciseList
           
            if (exerciseList.selected == true) {
                queryText = `INSERT INTO "workout_detail" ("workout_id", "exercise_id") VALUES ($1, $2);`;
                const result = await client.query(queryText, [workoutId, exerciseList.id]);
                await client.query('COMMIT');
                res.sendStatus(201);
            } else {
                res.sendStatus(500);
            }
        }
            
        } catch (e) {
            console.log('ROLLBACK', e);
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    })().catch((error) => {
        console.log('CATCH', error);
        res.sendStatus(500);
    });
});

module.exports = router;