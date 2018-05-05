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
router.post('/newsession', (req, res) => {
    // console.log('user', req.user); 
    const newSession = req.body;
    console.log('newSession', newSession);

    (async () => {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');
            // post new workout to DB and assign new ID
            let queryText = `INSERT INTO "workoutApp"."session" ("user_id", "workout_id", "date") VALUES ($1, $2, now()) RETURNING "id";`;
            const sessionValues = [req.user.id, newSession.exerciseArray[0].workout_id,];
            const sessionResult = await client.query(queryText, sessionValues);
            // console.log('workoutResult', workoutResult);
            const sessionId = sessionResult.rows[0].id;
            console.log('sessionId', sessionId);

            // loop through exercises and post to "workout_details" with exerciseID and workoutIF
            for (let sessionExercise of newSession.exerciseArray) {
                queryText = `INSERT INTO "workoutApp"."completed_exercise" 
                            ("session_id", "exercise_id", "completed_sets", "completed_reps", "completed_weights", "completed?" ) 
                            VALUES ($1, $2, $3, $4, $5, $6);`;
                await client.query(queryText, 
                            [sessionId, sessionExercise.id, sessionExercise.default_sets, 
                            sessionExercise.default_reps, sessionExercise.default_weight, "TRUE"]);
                    await client.query('COMMIT');
        }
            } catch (e) {
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
});

module.exports = router;