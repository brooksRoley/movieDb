const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const request = require('request');

// Express Configuration:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Declaration
const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = '808cabea1582db02810d3c942e6781f8';

// Get Popular
app.get('/api/popular/:page', (req, res) => {
  let page = req.params.page || 1;
  request(`${BASE_URL}/movie/popular?page=${page}&api_key=${API_KEY}`, (err, response, body) => {
    if (err) { return console.log(err); }
    res.send(body);
  })
});

// Get Search
app.get('/api/search/movie/:id', (req, res) => {
  let id = req.params.id;
  request(`${BASE_URL}/search/movie/?api_key=${API_KEY}&language=en-US&query=${id}`, (err, response, body) => {
    if (err) { return console.log(err); }
    res.send(body);
  })
});

// Get Movie
app.get('/api/movie/:id', (req, res) => {
  let id = req.params.id;
  request(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`, (err, response, body) => {
    if (err) { return console.log(err); }
    res.send(body);
  })
})
// Get Similar Movies
app.get('/api/movie/:id/similar', (req, res) => {
  let id = req.params.id;
  request(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`, (err, response, body) => {
    if (err) { return console.log(err); }
    res.send(body);
  })
})

// Get Cast
app.get('/api/cast/:id', (req, res) => {
  let id = req.params.id;
  request(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`, (err, response, body) => {
    if (err) { return console.log(err); }
    res.send(body);
  })
})

// Get Person
app.get('/api/person/:id', (req, res) => {
  let id = req.params.id;
  request(`${BASE_URL}/person/${id}?api_key=${API_KEY}`, (err, response, body) => {
    if (err) { return console.log(err); }
    res.send(body);
  })
})

// Get Person's Credits
app.get('/api/person/:id/credits', (req, res) => {
  let id = req.params.id;
  request(`${BASE_URL}/person/${id}/movie_credits?api_key=${API_KEY}`, (err, response, body) => {
    if (err) { return console.log(err); }
    res.send(body);
  })
})

// Get Genres
app.get('/api/genres', (req, res) => {
  request(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`, (err, response, body) => {
    if (err) { return console.log(err); }
    res.send(body);
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
