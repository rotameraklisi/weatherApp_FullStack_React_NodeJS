const request = require('request-promise');

const WEATHER_API_KEY = 'MY_OWN_API_KEY';


class Weather {
    static retrieveByCity (city, callback) {
      request({
        uri: `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${WEATHER_API_KEY}&units=imperial`,
        json: true
      }).then((res) => {
        callback(res);
      }).catch((err) => {
        console.log(err);
        callback({ error: 'Could not reach OpenWeatherMap API.' });
      });
    }
  }
  

module.exports = Weather;