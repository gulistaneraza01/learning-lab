-- get /users  -> page 0 limit 10 desc createdat

--$1-> OFFSET- 0,$2-> LIMIT-10 ,
SELECT
  us.*,
  to_jsonb (up) AS profile
FROM
  users us
  LEFT JOIN users_profile up ON us.id = up.user_id
ORDER BY
  us.created_at DESC
OFFSET
  $1
LIMIT
  $2
;


-- get /users/{id}
-- $1 ---> :userId -> uuid
SELECT
u.*, to_jsonb(up.*)
FROM user u
LEFT JOIN user_profile up ON a.id = b.user_id
where u.id = :userId;


-- Insert data into 'users'
INSERT INTO TableName (name, email,password,role)
VALUES ('Raza','raza@gmail.com','jfdhhs','admin')
RETURNING *;


-- Update rows in 'TableName' where condition is met
UPDATE users
SET :field = :value
WHERE id=:id
RETURNING *;
