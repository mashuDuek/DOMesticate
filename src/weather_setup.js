import { weatherAPI } from '../secrets.js';

class Weather {

  constructor () {
    this.loadWeather();
  }

  loadWeather () {
    $domesticate.ajax({
      url: `http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=${weatherAPI}`,
      success: (res) => {
        res = JSON.parse(res);
        this.render(res);
      }
    });
  }

  render (res) {
    const result = res.query.results.channel;
    const forecast = result.item.forecast;
    const today = result.item.condition;

    const weatherHtml = `
      <div class="weather-wrapper">
        <p class="weather-city"></p>
        <p class="weather-date"></p>
        <p class="weather-text"></p>
        <img class="weather-img"></img>
        <p class="weather-temp"></p>
        <p class="weather-humid"></p>
        <p class="weather-wind"></p>
      </div>
      <ul class="forecast-wrapper">
      </ul>
    `;
    $domesticate('.weather').append(weatherHtml);

    $domesticate('.weather-city').html(result.location.city);
    $domesticate('.weather-date').html(today.date);
    $domesticate('.weather-temp').html(`Temperature: ${today.temp} F`);
    $domesticate('.weather-wind').html(`Winds: ${result.wind.speed} mhp`);
    $domesticate('.weather-humid').html(`Humidity: ${result.atmosphere.humidity}%`);
    $domesticate('.weather-img').attr(
      'src',
      `https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/${today.code}d.png`
    );

    forecast.forEach( (fore, i) => {
      if (i > 7) return;

      const forecast = `
        <li>
          <p>${fore.day}</p>
          <div class="day-forecast">
            <p>${fore.high}F</p>
            <p>${fore.low}F</p>
          </div>
        </li>
      `;

      $domesticate('.forecast-wrapper').append(forecast);
    });
  }
}
