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
