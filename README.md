# NodeJS User Authentication

## Setup

Clone the repository first, and then run `npm i` to install the dependencies. Then create a copy of `.env.example` file using this command: `cp .env.example .env`.

Now you need to update the `.env` file and then run `npm start` to launch the app.

## User Registeration

```bash
curl -X POST http://localhost:3000/auth/register \
  -d '{"email": "john@gmail.com", "password": "changeme"}' \
  -H "Content-Type: application/json"
```
