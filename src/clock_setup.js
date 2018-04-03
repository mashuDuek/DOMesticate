class Clock {
  constructor(){
    this.time = new Date();

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
    const time = `
      <div class="time">
        <p class="hours">${this.time.getHours()} :</p>
        <p class="minutes">${this.time.getMinutes()} :</p>
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

// export default class Clock extends React.Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       time: new Date()
//     };
//     this.tick = this.tick.bind(this);
//   }
//
//   componentDidMount() {
//     this.intervalId = setInterval(this.tick, 1000);
//   }
//
//   componentWillUnmount() {
//     clearInterval(this.intervalId);
//   }
//
//   tick() {
//     this.setState({time: new Date()});
//   }
//
//   render() {
//     let hours = this.state.time.getHours();
//     let minutes = this.state.time.getMinutes();
//     let seconds = this.state.time.getSeconds();
//
//     hours = (hours < 10) ? `0${hours}` : hours;
//     minutes = (minutes < 10) ? `0${minutes}` : minutes;
//     seconds = (seconds < 10) ? `0${seconds}` : seconds;
//
//     return (
//       <div>
//         <h1>Clock</h1>
//         <div className='clock'>
//           <p><span>
//                Time:
//              </span>
//              <span>
//                {hours}:{minutes}:{seconds} PDT
//              </span>
//           </p>
//           <p>Date: {this.state.time.toDateString()}</p>
//         </div>
//       </div>
//     );
//   }
// };
