````markdown
# User API – Express + PostgreSQL

Base URL: **`http://localhost:5000`**

---

## Endpoints

| Method | Path          | Description                     | Body / Params | Success Response |
|--------|---------------|---------------------------------|---------------|------------------|
| GET    | `/`           | Health-check / home page        | –             | **200** “HomePage is here!” |
| GET    | `/users`      | List **all users**              | –             | **200** JSON array |
| GET    | `/users/:id`  | Get **one user** by ID          | URL param `id`| **200** user object<br>**404** if not found |
| POST   | `/users`      | **Create** a user               | `{ name, email, age }` | **201** created object<br>**409** email exists |
| PUT    | `/users/:id`  | **Replace** a user              | same as POST  | **200** updated object<br>**404** if not found |
| DELETE | `/users/:id`  | **Delete** a user               | –             | **200** confirmation<br>**404** if not found |

> Any other path returns **404 Route not found** (handled by the global middleware).

---

## Examples

```bash
# List users
curl http://localhost:5000/users

# Get user 3
curl http://localhost:5000/users/3

# Create a user
curl -X POST http://localhost:5000/users \
     -H "Content-Type: application/json" \
     -d '{"name":"Ada Lovelace","email":"ada@example.com","age":36}'
````

Successful POST → **201**

```json
{
  "message": "User added successfully",
  "user": {
    "id": 7,
    "name": "Ada Lovelace",
    "email": "ada@example.com",
    "age": 36
  }
}
```

---

## Error Codes

| Code | Meaning                               |
| ---- | ------------------------------------- |
| 404  | Route not found / user not found      |
| 409  | Duplicate user (email already exists) |
| 500  | Database or server error (generic)    |

---

## Project Structure

```
project/
├─ index.js          # server entry
├─ .env              # environment variables (ignored by git)
├─ db.js             # PostgreSQL client / pool
├─ routes/
│   └─ users.js      # Express router for /users
└─ controllers/
    └─ users.js      # business logic for users
```

### Environment (.env)

```
PORT=5000
DB_USER=…
DB_PASSWORD=…
DB_HOST=…
DB_NAME=postgres
DB_PORT=5432
```

Load with:

```js
import 'dotenv/config';
```

---

## Setup

```bash
npm install
npm start dev          # nodemon index.js
```

Ensure PostgreSQL is reachable and the `users` table exists:

```sql
CREATE TABLE IF NOT EXISTS users (
  id    SERIAL PRIMARY KEY,
  name  TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  age   INT
);
```

```
```
