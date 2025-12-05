CREATE EXTENSION IF NOT EXISTS "pgcrypto";


CREATE TABLE attendance (
id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
user_id uuid NOT NULL,
class_date date NOT NULL,
created_at timestamp DEFAULT now()
);


CREATE TABLE techniques (
id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
name text NOT NULL,
belt_level text NOT NULL,
description text
);


CREATE TABLE notes (
id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
user_id uuid NOT NULL,
technique_id uuid NOT NULL,
content text,
created_at timestamp DEFAULT now()
);