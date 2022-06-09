# NodeJS User Authentication

## Setup

Clone the repository first, and then run `npm i` to install the dependencies. Then create a copy of `.env.example` file using this command: `cp .env.example .env`.

Now you need to update the `.env` file and then run `npm start` to launch the app.

## User Registration

```bash
curl -X POST http://localhost:3000/auth/register \
  -d '{"email": "john@gmail.com", "fullname": "John Doe", "password": "secret1234"}' \
  -H "Content-Type: application/json"
```

## User Login

```bash
curl -v -X POST http://localhost:3000/auth/login \
  -d '{"email": "john@gmail.com", "password": "secret1234"}' \
  -H "Content-Type: application/json"
```

## Email Verification

```bash
curl -v -X POST http://localhost:3000/auth/send-verification-email \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MmEyM2ZjZGM5MmU5Y2JiMDJhOGI0NWEiLCJpYXQiOjE2NTQ4MDI0MjN9.fJv3yvhuHyCVH56a4nppukrue48KAW54oHwdR-uOCt8"
```
