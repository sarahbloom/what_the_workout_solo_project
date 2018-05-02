SELECT * FROM "workout" WHERE user_id = $1;

SELECT "exercise"."name", "default_sets", "default_reps", "default_weight" FROM "exercise" 
	JOIN "workout_detail" ON "exercise"."id" = "workout_detail"."exercise_id"
	JOIN "workout" ON "workout"."id" = "workout_detail"."workout_id"
	WHERE "workout"."id" = 3;



SELECT "exercise"."name", "default_sets", "default_reps", "default_weight", "workout"."name" as "workout_name" FROM "exercise" 
    JOIN "workout_detail" ON "exercise"."id" = "workout_detail"."exercise_id"
    JOIN "workout" ON "workout"."id" = "workout_detail"."workout_id"
    WHERE "workout"."id" = 1;

SELECT * FROM "exercise" ORDER BY "family", "name";

INSERT INTO "workout" ("name", "user_id") VALUES ($1, $2);

workout_id REFERNCES 



INSERT INTO "workout_detail" ("workout_id", "exercise_id") VALUES (4, 4);

DELETE FROM "workout" WHERE "id"=25;




CREATE SCHEMA "workoutApp";

CREATE TABLE "workoutApp"."person" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (100) NOT NULL
);

CREATE TABLE "workoutApp"."workout" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(60) NOT NULL,
  "user_id" INT REFERENCES "workoutApp"."person" (id)
);

CREATE TABLE "workoutApp"."exercise" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL,
  "default_sets" INT,
  "default_reps" VARCHAR(20),
  "default_weight" VARCHAR(20),
  "family" VARCHAR(30) NOT NULL
);

CREATE TABLE "workoutApp"."workout_detail" (
  "id" SERIAL PRIMARY KEY,
  "workout_id" INT REFERENCES "workoutApp"."workout" (id) ON DELETE CASCADE,
  "exercise_id" INT REFERENCES "workoutApp"."exercise" (id) ON DELETE CASCADE
);

CREATE TABLE "workoutApp"."session" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT NOT NULL,
  "workout_id" INT REFERENCES "workoutApp"."workout" (id) ON DELETE CASCADE
);


CREATE TABLE "workoutApp"."completed_exercise" (
  "id" SERIAL PRIMARY KEY,
  "session_id" INT REFERENCES "workoutApp"."session" (id) ON DELETE CASCADE,
  "exercise_id" INT REFERENCES "workoutApp"."exercise" (id) ON DELETE CASCADE,
  "completed_sets" INT,
  "completed_reps" VARCHAR(20),
  "completed_weights" VARCHAR(20),
  "completed?" BOOLEAN NOT NULL
);

INSERT INTO "workoutApp"."workout" (name, user_id)
VALUES
('Squats and More', 1),
('Deadlifts at Midnight', 1),
('Wednesday Wonder Arms', 1);

INSERT INTO "workoutApp"."exercise" (name, default_sets, default_reps, default_weight, family)
VALUES
('Squats', 5, 5, 155, 'lower body'),
('Deadlift', 5, 5, 185, 'lower body'),
('Lunge', 10, 4, '20x20', 'lower body'),
('Straight Leg Deadlifts', 10, 4, 65, 'lower body'),
('Rows', 12, 3, 75, 'lower body'),
('Box Jump', 10, 3, '18"', 'lower body'),
('Good Mornings', 8, 5, 85, 'lower body'),
('Fly', 12, 4, '15x15', 'upper body'),
('Lateral Pull Down', 12, 3, 7, 'upper body'),
('Bicep Curls', 10, 4, '20x20', 'upper body'),
('Tricep Extensions', 10, 4, '10x10', 'upper body'),
('Split Squat', 10, 4, '20x20', 'lower body');

INSERT INTO "workoutApp"."workout_detail" ("workout_id", "exercise_id")
VALUES (4,5), (4,7), (4,12), (4,10), (5,6), (5,8), (5,11), (5,9), (6,1), (6,2), (6,3), (6,4);