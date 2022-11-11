# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you need to run the next 2 commands in different terminal to set up the project:

### `npm run lambda`

to run the lambda function server, I implemented this to get rid of CORS
if you face this error `opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ]`
you need to run this command in your terminal to get rid of it `export NODE_OPTIONS=--openssl-legacy-provider` otherwise you'll be all good

### `npm start`

and run this command to run the react project & you'll be good to go

### `npm test`

Launches the test runner in the interactive watch mode.
there are 2 test files one for login screen and the other one for Dashboard screen.
