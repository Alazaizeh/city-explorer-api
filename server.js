"use strict";
const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();
const server = express();
const PORT = process.env.PORT;
server.use(cors());

server.get("/", (req, res) => {
  res.status(200).send(`City Explorer API`);
});

server.get("/weather", (req, res) => {
  let url = `http://api.weatherbit.io/v2.0/current?key=${process.env.WEATHER_API_KEY}&lat=${req.query.lat}&lon=${req.query.lon}&city=${req.query.city}`;
  axios
    .get(url)
    .then((weatherData) => {
      res
        .status(200)
        .send(
          new Forecast(
            weatherData.data.data[0].datetime,
            weatherData.data.data[0].weather.description
          )
        );
    })
    .catch((error) => {
      console.log(error);
    });
});

server.get("/movies", (req, res) => {
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${req.query.city}`;
  axios
    .get(url)
    .then((moviesData) => {
      res.status(200).send(
        moviesData.data.results.map((movie) => {
          return new Movies(
            movie.title,
            movie.overview,
            movie.release_date,
            movie.vote_average,
            movie.vote_count,
            movie.popularity,
            movie.poster_path
          );
        })
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

class Movies {
  constructor(
    title,
    overview,
    released_on,
    average_votes,
    total_votes,
    popularity,
    image_url
  ) {
    this.title = title;
    this.overview = overview;
    this.released_on = released_on;
    this.average_votes = average_votes;
    this.total_votes = total_votes;
    this.image_url = "https://image.tmdb.org/t/p/w500/" + image_url;
    this.popularity = popularity;
  }
}
