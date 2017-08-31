# Synthor API
## Links
Deployed front end app: https://jltyler.github.io/synthor-front
Deployed API: https://peaceful-wildwood-37664.herokuapp.com/
Front end repo: https://github.com/jltyler/synthor-front

## What is this?
The API to go along with my Synthor single page application. This API is responsible for persisting patch data for use later.

## Installation and Usage
Run `npm install` in the API root directory.

Then use `bin/express server` in the root dir to run the server.

## Technologies used
The server itself uses Express.js on top of Node.js. The server uses MongoDB as a database with Mongoose providing a schema and models to persist the data.

## Approach
The database schema was mapped out before anything else. I knew what patch settings I wanted to persist so I figured I would have no trouble creating the schema. I originally had planned to use nested objects to send in the requests but I realized that malformed request could end up breaking a record in a database which would cause it to be empty. I ended up flattening the database to avoid this potential problem.

After creating the schema I created the controllers for the CRUD actions on the patches. I tested all the CRUD actions before moving onto writing privacy into the patch records. I added to the controller actions so the index would fetch all patches owned by a user as well as all patches listed as public. I then made similar changes to the show action so a user could not show a private patch unless they owned it.

## Unresolved Issues
I still want to unflatten the database but it will take some time to come up with an elegant solution that does not just check every property manually. I will devise a good solution to this rather than use a hacky solution that reeks of code smell.

## Endpoints
### Auth
Verb | URI Pattern | Action
--- | --- | ---
POST | `/sign-up` | `users#signup`
POST | `/sign-in` | `users#signin`
DELETE | `/sign-out/:id` | `users#signout`
PATCH | `/change-password/:id` | `users#changepw`

### Users (requires token)
Verb | URI Pattern | Action
--- | --- | ---
GET | `/users` | `users#index`
GET | `/users/:id` | `users#show`

### Patches (requires token)
Verb | URI Pattern | Action
--- | --- | ---
GET | `/patches` | `patches#index`
GET | `/patches/:id` | `patches#show`
PATCH | `/patches/:id` | `patches#update`
POST | `/patches` | `patches#create`
DELETE | `/patches/:id` | `patches#destroy`

## ERD
https://wireframe.cc/zgILTK
