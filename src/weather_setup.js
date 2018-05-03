class Weather {

  constructor () {
    this.loadWeather();
  }

  loadWeather () {
    $domesticate.ajax({
      url: "https://query.yahooapis.com/v1/public/yql",
      data: {
        q: "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='manhattan, NY')",
        format: "json",
        env: "store://datatables.org/alltableswithkeys"
      },
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
    $domesticate('.weather-temp').html(`temperature: ${today.temp} F`);
    $domesticate('.weather-wind').html(`winds: ${result.wind.speed} mhp`);
    $domesticate('.weather-humid').html(`humidity: ${result.atmosphere.humidity}%`);
    $domesticate('.weather-img').attr(
      'src',
      `https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/${today.code}d.png`
    );

    forecast.forEach( (fore, i) => {
      if (i > 7 ) return;
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
