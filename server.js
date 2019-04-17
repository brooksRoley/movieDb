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
let configuration = `${BASE_URL}/configuration?api_key=${API_KEY}`;


app.get('/api/popular', (req, res) => {
	let url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
	console.log(req);
	console.log(res);

	// let data = https.get(url, (movieList) => {
	// 	return movieList;
	// });
	// console.log(data);

	res.send(data);
});


app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
