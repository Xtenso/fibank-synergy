# Fibank Synergy

## Installation

- clone repository on local machine
- navigate to server directory: **cd server**
  - install dependencies: **npm install**
  - create a .env file in root server directory with following values: **PORT | MONGODB_URI | JWT_SECRET | JWT_EXPIRES_IN | CLIENT_URL**
  - for seeding database: **npm run seed**
  - return to project root: **cd ..**
- make sure you have Mongo DB installed and started
- navigate to client directory: **cd client**
  - install dependencies: **npm install**

## Starting the application

- starting server side: **cd server > npm run dev**
- starting client side: **cd client > npm run dev**
- open **http://localhost:3000** (or preferred PORT) in your browser

## Automatic testing

- currently possible for Login and Register functionality and validation
- to start: **cd client** > **npm run test:e2e**
- you can find test results repost in: **playwright-report > index.html**
  - it will open automatically if any of the tests fail

## Libraries and frameworks used

- React, Next.js and Type Script on **frontend**
- MongoDB, Node.js and Type Script on **backend**
- Playwright for **e2e testing**
- HeroUI: component library
