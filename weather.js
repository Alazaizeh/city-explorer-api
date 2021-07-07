const axios = require("axios");
const weather = (server) => {
  server.get("/weather", (req, res) => {
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${req.query.lat}&lon=${req.query.lon}&city=${req.query.city}&key=${process.env.WEATHER_API_KEY}&days=3`;
    console.log(url);
    // `http://api.weatherbit.io/v2.0/current?key=${process.env.WEATHER_API_KEY}`;

    axios
      .get(url)
      .then((weatherData) => {
        res
          .status(200)
          .send(
            weatherData.data.data.map(
              (day) => new Forecast(day.datetime, day.weather.description)
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
