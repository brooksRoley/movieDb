# movieDb
Movie search and info project in React and Node

To run this repository, make sure you have npm installed, clone a copy of it.

inside the repo, run
```npm install```
this will install the dependencies for 'request' 'body-parser' and 'express'
then run ```node server``` to start the backend app.

in a separate terminal tab,
```cd react```
```npm install```
```npm start```
to start the react application that depends on the backend node application to make requests to the movie DB.

the node server should be running on localhost:5000 and the react server should be running on localhost:3000 and sends it's proxy to 5000.


#To Do List:
1. Filter data returned from API on the backend to improve performance after deciding on feature set and knowing what pieces are relevant.
2. Implement Redux for a front end data store to pass data between pages and limit slow api calls.
3. Implement server side rendering with some templates and implement hydration on the front end to improve performance.
4. When clicking a genre, fill the list with a page that fits that genre / close the genre open. (add animation?)
5. On /post/review, attach that review list as comments beneath the movie. Choose whether the review will be compiled by user or movie or both? How do I want to persist that data? How do I want to track user authentication (this would be a good oauth practice)?
6. As a user, I should be able to type in a search term, and see results immediately as I type
(Bonus) Limit network requests to only happen after a pause, and not every keystroke
7. Move the <Actor /> component to open as a modal instead of as a route.
