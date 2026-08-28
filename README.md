# TaskBoard

TaskBoard is a full-stack to-do application built for the TeSA Software Engineering Foundations assignment. It uses a React frontend, an Express backend, and a PostgreSQL database.

## Features

- Add new tasks
- View saved tasks
- Mark tasks as complete or incomplete
- Delete tasks
- Persist tasks in PostgreSQL after the browser or backend is closed

## Tech Stack

- React with Vite
- Express.js
- PostgreSQL
- Node.js

## Project Structure

```text
todo-app/
  client/   React frontend
  server/   Express API and database schema
```

## Local Setup

Create the PostgreSQL user and database:

```sql
CREATE USER todouser WITH PASSWORD 'todopass';
CREATE DATABASE todoapp OWNER todouser;
```

Create the table:

```powershell
cd server
psql -h localhost -U todouser -d todoapp -f schema.sql
```

Install backend dependencies and start the API:

```powershell
cd server
npm install
npm start
```

Install frontend dependencies and start the React app:

```powershell
cd client
npm install
npm run dev
```

Open the local frontend URL shown by Vite, usually:

```text
http://127.0.0.1:5173/
```

## API Routes

- `GET /api/todos` - list all tasks
- `POST /api/todos` - add a task
- `PATCH /api/todos/:id` - toggle task completion
- `DELETE /api/todos/:id` - delete a task

## Assignment Details

- Name: Oyeyemi Oluwatobiloba
- Class: A
- Pair: 16

## Deployment

AWS deployment will be completed after the class AWS account is provisioned. The planned deployment uses an Ubuntu EC2 instance with nginx serving the React build and proxying `/api/` requests to the Express backend.
