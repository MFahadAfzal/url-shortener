DROP TABLE IF EXISTS clicks CASCADE;
DROP TABLE IF EXISTS urls CASCADE;

CREATE TABLE urls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shortUrl VARCHAR(255),
  longUrl VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expiring_at TIMESTAMP
);

CREATE TABLE clicks (
  urlId uuid REFERENCES urls(id),
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);