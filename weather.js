const axios = require("axios");
const weather = (server) => {
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
};
module.exports = weather;

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}
