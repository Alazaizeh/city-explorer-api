const axios = require("axios");

const movies = (server) => {
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
};

module.exports = movies;

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
