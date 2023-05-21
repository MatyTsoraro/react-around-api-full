# Project 12-13: Around the U.S. Back End

## Overview

- Intro
- Technologies and Techniques
- Project Features
- Directories
- Commands for running the Project

## Intro

This is the 12th project at Practicum by Yandex and works on Back End. In this project, an initial server been set up with its requests, routing, data processing and files structured.  
**Project 13 Update :** Built a RESTful API, MongoDB setup and an implementation of a basic temporary authorization.

## Technologies and Techniques

- Node.js
- Express.js
- MongoDB/mongoose
- JSON
- Git/GitHub
- **Postman**: for testing requests.
- **MongoDB Compass** - Helps making a clever decisions regarding the data structure, querying, indexing, and many more actions you can perform on the database.
- Launching on a **Local Port 3000**.
- MongoDB server runs on **localhost:27017**.

## Project Features

- Server requests
- Handling errors
- Routing files
- Schemas for our data
- Validation with Regular Expression
- Express Rate Limit - Prevents the same IP address from making too many requests which will help to prevent attacks like brute force.

## Directories

`/controllers` — Server requests and Data processing.

`/helpers` — Creating error and its handler.

`/models` — Schemas for user and card data with validation.

`/routes` — routing files.

`/utils` — Getting the file data function.

## Routes Path

### Users :

`/users` — GETting data from all users and creating a new one (POST).

`/users/:_id` — GETting user by their id.

`/users/me` — Updating user data (PATCH).

`/users/me/avatar` — Updating user avatar data (PATCH).

### Cards :

`/cards` — GETting data from all cards and creating a new one (POST).

`/cards/:cardId` — DELETE card by its id.

`/cards/:cardId/likes` — Liking a card (PUT) or Disliking it (DELETE).

## Running the Project

`npm run start` — to launch the server.

`npm run dev` — to launch the server with the hot reload feature.
