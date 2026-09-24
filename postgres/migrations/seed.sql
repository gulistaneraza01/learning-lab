BEGIN;

-- 1. users
INSERT INTO users (name, email, password, role)
SELECT v.name, v.email, crypt(:'seed_password', gen_salt('bf', 12)), v.role::user_role
FROM (VALUES
  ('Super Admin', 'superadmin@example.com', 'super_admin'),
  ('Alice Admin', 'alice@example.com',      'admin'),
  ('Raza',        'raza@example.com',       'user'),
  ('Bob',         'bob@example.com',        'user')
) AS v(name, email, role)
ON CONFLICT (email) DO NOTHING;

-- 2. users_profile -------------------------------------------------------
INSERT INTO users_profile (user_id, user_name, bio, phone, avatar_url, address)
SELECT u.id, p.user_name, p.bio, p.phone, p.avatar_url, p.address::jsonb
FROM (VALUES
  ('superadmin@example.com', 'superadmin', 'Platform owner', NULL, NULL,
     '{"city": "Bengaluru", "country": "IN"}'),
  ('alice@example.com', 'alice', 'Engineering manager', '+91-90000-00001', NULL,
     '{"city": "Mumbai", "country": "IN"}'),
  ('raza@example.com', 'raza', 'Backend developer', '+91-90000-00002', NULL,
     '{"city": "Delhi", "country": "IN"}'),
  ('bob@example.com', 'bob', NULL, NULL, NULL, NULL)
) AS p(email, user_name, bio, phone, avatar_url, address)
JOIN users u ON u.email = p.email
ON CONFLICT (user_id) DO NOTHING;

-- 3. projects ------------------------------------------------------------
INSERT INTO projects (name, description, status, owner_id)
SELECT p.name, p.description, p.status::project_status, u.id
FROM (VALUES
  ('Website Redesign', 'Revamp the marketing site',  'active',    'alice@example.com'),
  ('Mobile App',       'Flutter client for the API', 'active',    'alice@example.com'),
  ('Legacy Migration', 'Move old services to Go',    'in_active', 'raza@example.com')
) AS p(name, description, status, owner_email)
JOIN users u ON u.email = p.owner_email
WHERE NOT EXISTS (
  SELECT 1 FROM projects x WHERE x.owner_id = u.id AND x.name = p.name
);

-- 4. project_members -----------------------------------------------------
INSERT INTO project_members (user_id, project_id)
SELECT m.id, p.id
FROM (VALUES
  ('alice@example.com', 'Website Redesign', 'alice@example.com'),
  ('raza@example.com',  'Website Redesign', 'alice@example.com'),
  ('bob@example.com',   'Website Redesign', 'alice@example.com'),
  ('alice@example.com', 'Mobile App',       'alice@example.com'),
  ('raza@example.com',  'Mobile App',       'alice@example.com'),
  ('raza@example.com',  'Legacy Migration', 'raza@example.com')
) AS pm(member_email, project_name, owner_email)
JOIN users o    ON o.email = pm.owner_email
JOIN projects p ON p.owner_id = o.id AND p.name = pm.project_name
JOIN users m    ON m.email = pm.member_email
ON CONFLICT (user_id, project_id) DO NOTHING;

-- 5. tasks ---------------------------------------------------------------
INSERT INTO tasks (project_id, title, description, status, priority, user_id)
SELECT p.id, t.title, t.description, t.status::task_status, t.priority, a.id
FROM (VALUES
  ('Website Redesign', 'alice@example.com', 'Design homepage mockups', 'Figma mockups for review', 'done',        3, 'bob@example.com'),
  ('Website Redesign', 'alice@example.com', 'Build landing page',      NULL,                        'in_progress', 4, 'raza@example.com'),
  ('Website Redesign', 'alice@example.com', 'Set up analytics',        NULL,                        'pending',     1, NULL),
  ('Mobile App',       'alice@example.com', 'Auth flow',               'Login and token refresh',   'in_progress', 5, 'raza@example.com'),
  ('Mobile App',       'alice@example.com', 'Push notifications',      NULL,                        'pending',     2, 'raza@example.com'),
  ('Legacy Migration', 'raza@example.com',  'Inventory old services',  NULL,                        'pending',     0, 'raza@example.com')
) AS t(project_name, owner_email, title, description, status, priority, assignee_email)
JOIN users o    ON o.email = t.owner_email
JOIN projects p ON p.owner_id = o.id AND p.name = t.project_name
LEFT JOIN users a ON a.email = t.assignee_email
WHERE NOT EXISTS (
  SELECT 1 FROM tasks x WHERE x.project_id = p.id AND x.title = t.title
);

COMMIT;
