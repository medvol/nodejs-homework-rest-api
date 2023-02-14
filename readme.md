
# REST API with Node.js, Express, and MongoDB

The "REST API with Node.js, Express, and MongoDB" project is part of the homework assignment for the "Node.js" course at GoIT.

## Project Description
The project is a server application that provides a REST API for storing, editing, and retrieving information about users and their contacts. The application is implemented using Node.js, Express, and MongoDB.

## Installation and Setup Instructions
Clone the GitHub repository to your local computer using the

```bash
 git clone https://github.com/medvol/nodejs-homework-rest-api.git 
```
command.
Open the terminal and navigate to the project directory.
Install dependencies by running the 
```bash
npm install 
```
Start the application by running the 
```bash
npm start 
```

## Available Endpoints
`GET /api/users` - Returns a list of users

`GET /api/users/:userId` - Returns a user by ID

`POST /api/users` - Creates a new user

`PUT /api/users/:userId` - Updates information about a user by ID

`DELETE /api/users/:userId` - Deletes a user by ID

`GET /api/contacts` - Returns a list of contacts

`GET /api/contacts/:contactId` - Returns a contact by ID

`POST /api/contacts` - Creates a new contact

`PUT /api/contacts/:contactId` - Updates information about a contact by ID

`DELETE /api/contacts/:contactId` - Deletes a contact by ID

## Database Structure Description
The project uses the MongoDB database to store information about users and their contacts. 
