# What

This is some code for running a Express server for handling a REST API
for the veterinarian app drug database (vaddb).

# How

## Install

Install npm however you like. Then run `npm install`. To install from 
`package.json`.

For most of the of script found in the `package.json` scripts section, you will
need `pm2` installed.

It is a process manager daemon, so it is best to install it globally with 
`npm install pm2 -g`. This might require administrator privilege to install 
globally.

## Usage

For quick start of the server, run `npm run start` or `npm start`. This will
use plain node.js to run the server.

Installing `pm2` will allow to use `npm run dev` for a dev environment with
hot-loading, and `npm run prod` for a production version of the server with `pm2`.
There are some other scripts, but these are the important ones.

## Config

Included is the `example.ini` file. This stores configuration for the app.
The app actually looks at the `.env` file, but this should not be included in
version control, so `example.ini` is given for reference.

# App Structure

The structure is based on the the article [here](https://blog.logrocket.com/organizing-express-js-project-structure-better-productivity/)

## Main file

The main/entry point of the app is `app.js`. This introduces the global config
and the express module. Everything in the `src` folder is eventually combined
in here

## `src` folder

The `src` folder holds pretty much everything else...

### `configs`

Files that take the config from `process.env` and convert them into dictionaries
useful for inputting into functions

### `controller`

The place where the functions used by `routes` are implemented. Useful for 
separting *what* a route does and *where* the route should exist.

### `middlewares`

Place to store behaviors not specific to any route, known as middlewares by
Express.js

### `routes`

Files contain the actual URL's that should be handled by the app

### `services`

Files for things involving less routing kind of thing, such as database connections
and queries.

### `utils`

Miscellaneous scripts that are useful anywhere in the app
