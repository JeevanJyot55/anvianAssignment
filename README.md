AnVianAssignment

This repository contains a full-stack application with three components:
	•	auth-service/: Node.js + Express authentication service (with Prisma & PostgreSQL)
	•	customer-service/: Node.js + Express customer CRUD service (with Prisma & PostgreSQL)
	•	frontend/: React + Vite single-page app

⸻

Prerequisites
	1.	Node.js (version >= 18)
	2.	npm (version >= 9) or yarn
	3.	PostgreSQL (local or managed)
	4.	Git

⸻

Setup

1. Clone the repo

2. Start PostgreSQL
	•	Locally (macOS Homebrew):

brew services start postgresql
psql postgres -c "CREATE DATABASE anvian_db;"

Update your .env files in auth-service/ and customer-service/:

DATABASE_URL="postgresql://<USER>:<PASSWORD>@localhost:5432/anvian_db?schema=public"
JWT_SECRET="your_super_secret_key"

3. Install dependencies & generate Prisma clients

In each service folder:

cd auth-service
npm install
npx prisma generate

cd ../customer-service
npm install
npx prisma generate


⸻

Running Locally


•	Clone all the files into the local machine

•	Frontend-
o	Navigate to the frontend folder and enter the following command- 
	npm install
	npm run dev
•	Authorization Service-
o	Navigate to the auth-service folder and enter the following command- 
	npm install
	prisma npx prisma migrate reset –force
	npx prisma migrate dev --name init
	npm run dev

•	Cutomer Service-
o	Navigate to the cust-service folder and enter the following command-
	npm install
	prisma npx prisma migrate reset –force
	npx prisma migrate dev --name init
	npm run dev
•	Open the application at http://localhost:5173



