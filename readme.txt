HOW TO SETUP THE PROJECT
* Run By Docker
Step 1: cd backend && docker compose up -d
-> Note: Seeding data was already integrated while running "docker compose". In case there is an error in seeding data, make sure to remove the existing database first and run “docker compose up -d” again
Step 2: cd admin && docker compose up -d
Step 3: cd citizen-ad-portal && docker compose up -d

* Run manually
Run backend
1. cd backend
2. yarn
3. yarn db:schema
4. yarn seed
5. yarn dev

Run admin
1. cd admin
2. yarn
3. yarn start

Run map home page
1. cd citizen-ad-portal
2. yarn
3. yarn start

Admin: http://localhost:3000
Backend: http://localhost:4000
User Home Page: http://localhost:3001
