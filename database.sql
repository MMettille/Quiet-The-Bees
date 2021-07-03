
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "access_level" INT DEFAULT 0
);

CREATE TABLE "spoon_input" (
    "id" SERIAL PRIMARY KEY,
    "spoon" INT NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_DATE,
    "user_id" INT REFERENCES "user"
);

CREATE TABLE "trigger_input" (
	"id" SERIAL PRIMARY KEY,
	"trigger" VARCHAR (255),
	"date" DATE NOT NULL DEFAULT CURRENT_DATE,
	"user_id" INT REFERENCES "user"
);

CREATE TABLE "taskList" (
    "id" SERIAL PRIMARY KEY,
    "taskName" VARCHAR(1000),
    "isComplete" boolean DEFAULT false,
    "priority_id" integer REFERENCES "priority_list",
    "user_id" integer REFERENCES "user"
);

CREATE TABLE "priority_list" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (255),
	"color" VARCHAR (255),
	"priority_list" ADD "user_id" INT REFERENCES "user"
);