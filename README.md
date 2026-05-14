# URL Shortener

A full stack URL shortening service built with React, Node.js, Express, and PostgreSQL.

🔗 **Live Demo:** https://url-shortener-ejyr.onrender.com

---

## Features

- Shorten any long URL into a compact link
- Base62 encoding with a shuffled character set to prevent enumeration attacks
- Click tracking — every redirect is recorded
- Input validation with automatic `https://` prefix handling
- RESTful API with proper HTTP status codes and error handling

---

## Tech Stack

**Frontend**
- React
- Tailwind CSS
- Vite

**Backend**
- Node.js
- Express
- PostgreSQL
- pg-promise

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/shorten` | Create a new short URL |
| GET | `/:code` | Redirect to the original URL |
| PUT | `/shorten/:id` | Update a short URL |
| DELETE | `/shorten/:id` | Delete a short URL |
| GET | `/shorten/:id/stats` | Get click statistics for a URL |

---

## How It Works

1. User submits a long URL
2. The URL is inserted into the database and assigned a serial ID
3. The ID is encoded using Base62 with a shuffled character set, generating a short unique code
4. The short URL is returned to the user
5. When the short URL is visited, the server looks up the code, records a click, and redirects to the original URL

---

## Local Development

**Prerequisites:** Node.js, PostgreSQL

**Backend**
```bash
cd server
npm install
```

Create a `.env` file in the server folder:
```
DATABASE_URL=postgres://username:password@localhost:5432/url_shortener
BASE_URL=http://localhost:3000
CHARS=your_shuffled_base62_chars
PORT=3000
```

Set up the database:
```bash
psql -d your_database -f schema.sql
```

Start the server:
```bash
node index.js
```

**Frontend**
```bash
cd client
npm install
```

Create a `.env` file in the client folder:
```
VITE_API_URL=http://localhost:3000
```

Start the dev server:
```bash
npm run dev
```