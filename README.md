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
