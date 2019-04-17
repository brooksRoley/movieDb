const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const https = require('https');

// Express Configuration:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Declaration
const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = '808cabea1582db02810d3c942e6781f8';

// Get Genres
app.get('/api/genres', (req, res) => {
  return https.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`, (genres) => {
    // console.log('statusCode:', genres.statusCode);
    // console.log('headers:', genres.headers);
    genres.on('data', (d) => {
      process.stdout.write(d);
      res.send(d);
    });
  }).on('error', (e) => {
    console.error(e);
  })
});

// Post Review
app.post('/api/review', (req, res) => {
  let { review } = req.body;
  res.send(
    `I received your POST request. This is what you sent me: ${review}.
    This is where we would persist data with a database or cache it in the node server.`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
