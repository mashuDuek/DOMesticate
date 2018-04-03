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
    });//.then(res => {
    //   res = JSON.parse(res);
    //   render(res);
    // });
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
    `;
    $domesticate('.weather').append(weatherHtml);

    $domesticate('.weather-city').html(result.location.city);
    $domesticate('.weather-date').html(today.date);
    $domesticate('.weather-text').html(today.text);
    $domesticate('.weather-temp').html(`temperature: ${today.temp} F`);
    $domesticate('.weather-wind').html(`winds: ${result.wind.speed} mhp`);
    $domesticate('.weather-humid').html(`humidity: ${result.atmosphere.humidity}%`);
    $domesticate('.weather-img').attr(
      'src',
      `https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/${today.code}d.png`
    );

    // forecast.forEach( (f, i) => {
    //   if (i > 7 ) return;
    //   $l(`#forecast-day-${i}`).html(f.day);
    //   $l(`#forecast-high-${i}`).html(f.high);
    //   $l(`#forecast-low-${i}`).html(f.low);
    //   $l(`#img-${i}`).attr('src', `https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/${f.code}d.png`);
    // });
  }
}
