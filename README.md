# Flashcard website

## About the website

- This website uses static HTML pages loading dynamic JSON content from server via AJAX
- The server is written in nodejs and provides JSON through REST API
- The design of the website is based of [quizlet](https://quizlet.com/gb)

## How to start the server

 - First you need to install all the dependecies with `npm install`
 - Then you can start the server with `npm start` 
 - The server will automatically restart since it is started with nodemon

## Api documentation

The API documentation can be found [here](/APIdocumentation.md).

## Tests
- Test the server side JS with eslint run `npm run pretest`
- Test the API with jest run `npm test`