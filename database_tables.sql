CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);

CREATE TABLE "workout" (
  "id" serial NOT NULL,
  "name" varchar(60) NOT NULL,
  "user_id" int NOT NULL,
  CONSTRAINT workout_pk PRIMARY KEY ("id")
);

CREATE TABLE "exercise" (
  "id" serial NOT NULL,
  "name" varchar(50) NOT NULL,
  "default_sets" int,
  "default_reps" varchar(20),
  "default_weight" varchar(20),
  "family" varchar(30) NOT NULL,
  CONSTRAINT exercise_pk PRIMARY KEY ("id")
);

CREATE TABLE "workout_detail" (
  "id" serial NOT NULL,
  "workout_id" int NOT NULL,
  "exercise_id" int NOT NULL,
  CONSTRAINT workout_detail_pk PRIMARY KEY ("id")
);

CREATE TABLE "session" (
  "id" serial NOT NULL,
  "user_id" int NOT NULL,
  "workout_id" int NOT NULL,
  CONSTRAINT session_pk PRIMARY KEY ("id")
);

CREATE TABLE "completed_exercise" (
  "id" serial NOT NULL,
  "session_id" int NOT NULL,
  "exercise_id" int NOT NULL,
  "completed_sets" int,
  "completed_reps" varchar(20),
  "completed_weights" varchar(20),
  "completed?" BOOLEAN NOT NULL,
  CONSTRAINT completed_exercise_pk PRIMARY KEY ("id")
);


ALTER TABLE "workout" ADD CONSTRAINT "workout_fk0" FOREIGN KEY ("user_id") REFERENCES "person"("id");


ALTER TABLE "workout_detail" ADD CONSTRAINT "workout_detail_fk0" FOREIGN KEY ("workout_id") REFERENCES "workout"("id");
ALTER TABLE "workout_detail" ADD CONSTRAINT "workout_detail_fk1" FOREIGN KEY ("exercise-id") REFERENCES "exercise"("id");

ALTER TABLE "session" ADD CONSTRAINT "session_fk0" FOREIGN KEY ("user_id") REFERENCES "person"("id");
ALTER TABLE "session" ADD CONSTRAINT "session_fk1" FOREIGN KEY ("workout_id") REFERENCES "workout"("id");

ALTER TABLE "completed_exercise" ADD CONSTRAINT "completed_exercise_fk0" FOREIGN KEY ("session_id") REFERENCES "session"("id");
ALTER TABLE "completed_exercise" ADD CONSTRAINT "completed_exercise_fk1" FOREIGN KEY ("exercise_id") REFERENCES "exercise"("id");

INSERT INTO "workout" (name, user_id)
VALUES
('Squats and More', 1),
('Deadlifts at Midight', 1),
('Wednesday Wonder Arms', 1);

INSERT INTO "exercise" (name, default_sets, default_reps, default_weight, family)
VALUES
('Bench Press', 10, 4, 75, 'upper body'),
('Overhead Press', 8, 3, '25x25', 'upper body'),
('Front Raise', 10, 4, '10x10', 'upper body'),
('Lateral Raise', 10, 4, '10x10', 'upper body'),
('Fly', 12, 4, '15x15', 'upper body'),
('Lateral Pull Down', 12, 3, 7, 'upper body'),
('Bicep Curls', 10, 4, '20x20', 'upper body'),
('Tricep Extensions', 10, 4, '10x10', 'upper body'),
('Squats', 5, 5, 155, 'lower body'),
('Deadlift', 5, 5, 185, 'lower body'),
('Lunge', 10, 4, '20x20', 'lower body'),
('Straight Leg Deadlifts', 10, 4, 65, 'lower body'),
('Rows', 12, 3, 75, 'lower body'),
('Box Jump', 10, 3, '18"', 'lower body'),
('Good Mornings', 8, 5, 85, 'lower body'),
('Split Squat', 10, 4, '20x20', 'lower body');

INSERT INTO "workout_detail" ("workout_id", "exercise_id")
VALUES (1,5), (1,7), (1,12), (1,10), (2,6), (2,8), (2,11), (2,9), (3,1), (3,2), (3,3), (3,4);
