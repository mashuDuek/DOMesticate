class Clock {
  constructor(time){
    this.time = time;

    this.setup();
  }

  tick(){
    this.time = new Date();
    this.setup();
  }

  setup() {

    let seconds;
    if (this.time.getSeconds() < 10) {
      seconds = `0${this.time.getSeconds()}`;
    } else {
      seconds = this.time.getSeconds();
    }

    let minutes;
    if (this.time.getMinutes() < 10) {
      minutes = `0${this.time.getMinutes()}`;
    } else {
      minutes = this.time.getMinutes();
    }
    
    const time = `
      <div class="time">
        <p class="hours">${this.time.getHours()} :</p>
        <p class="minutes">${minutes} :</p>
        <p class="seconds">${seconds}</p>
      </div>
    `;

    if (Boolean($domesticate('.clock').nodes[0])) {
      $domesticate('.clock').children().remove();
      $domesticate('.clock').append(time);
    } else {
      $domesticate('.clock').append(time);
    }
    setInterval(this.tick.bind(this), 1000);
  }
}
