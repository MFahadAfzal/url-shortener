# Slim Link — URL Shortener

A full-stack URL shortening service with click analytics, geolocation tracking, and an interactive map. Built with React, Node.js, Express, and PostgreSQL.

🔗 **Live Demo:** https://url-shortener-ejyr.onrender.com

Please wait 30-60 second after first clicking to generate url as I am using a render to deploy my website and it takes 30-60 seconds to start the server

![Home Page](screenshots/home.png)
![Analytics Dashboard](screenshots/analytics.png)

## Features

- Shorten any URL with automatic `https://` prefix handling
- Base62 encoding with a shuffled character set to prevent enumeration attacks
- Configurable link expiration dates
- Click tracking with geolocation — every redirect records the visitor's country, latitude, and longitude
- Analytics dashboard showing click growth over time with an interactive world map
- Server-side rate limiting (30 requests/minute)
- Input validation with meaningful error messages
- End-to-end tests written with Playwright covering happy path, edge cases, expiration, and rate limiting

## Tech Stack

**Frontend:** React, Tailwind CSS, Vite, Recharts, React Leaflet

**Backend:** Node.js, Express, PostgreSQL, pg-promise

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/shorten` | Create a new short URL |
| GET | `/:code` | Redirect to the original URL and record click |
| GET | `/shorten/:id/stats` | Get click statistics for a URL |
| PUT | `/shorten/:id` | Update a short URL |
| DELETE | `/shorten/:id` | Delete a short URL |

## How It Works

1. User submits a long URL
2. The URL is inserted into the database and assigned a serial ID
3. The ID is encoded using Base62 with a shuffled character set, generating a unique short code
4. When the short URL is visited, the server looks up the code, records the visitor's geolocation via IP lookup, and redirects to the original URL
5. Click data is visualized on the analytics dashboard with a time series chart and world map

## Local Development

**Prerequisites:** Node.js, PostgreSQL

**Backend**
```bash
cd server
npm install
```

Create a `.env` file in the server folder:
DATABASE_URL=postgres://username:password@localhost:5432/url_shortener
FRONTEND_URL=http://localhost:5173
BASE_URL=http://localhost:3000
CHARS=your_shuffled_base62_chars
PORT=3000
NODE_ENV=development

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
VITE_API_URL=http://localhost:3000

Start the dev server:
```bash
npm run dev
```

## Running Tests
```bash
npx playwright test
```
