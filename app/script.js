import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      status: 'off',
      time: 0,
      timer: false,
    };
  }

  formatTime = (time) => {
    let secondsFormatted = Math.floor(time % 60);
    let minutesFormatted = Math.floor((time / 60) % 60);

    let seconds = secondsFormatted.toString().padStart(2, '0');
    let minutes = minutesFormatted.toString().padStart(2, '0');
    
    return (`${minutes}:${seconds}`);
  }

  step = () => {
    const { status, time } = this.state;

    this.setState({
      time: time - 1,
    })

    if(time === 0 && status === 'work') {
      this.setState({
        status: 'rest',
        time: 20,
      });
    } else if(time === 0 && status === 'rest'){
      this.setState({
        status: 'work',
        time: 1200,
      });
    }

    this.playBell();
  }

  startTimer = () => {
    this.interval = setInterval(this.step, 1000);

    this.setState({
      status: 'work',
      time: 1200,
      timer: true || setInterval(this.step, 1000),
    });
  }

  stopTimer = () => {
    clearInterval(this.interval);

    this.setState({
      status: 'off',
      time: 0,
      timer: false,
    })
  }

  closeApp = () => {
    window.close();
  }

  playBell = () => {
    const { status, time } = this.state;

    let audioElement = new Audio('./sounds/bell.wav');
    if(time === 0 && status !== 'off') audioElement.play();
  }

  render() {
    const { status, time } = this.state;

    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off') && 
          <div className='textContainer'>
            <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet (6 m) away.</p>
            <p>This app will help you track your time and inform you when it's time to rest.</p>
          </div>
        }
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && 
          <div className="timer">
            {this.formatTime(time)}
          </div>
        }
        {(status === 'off') && <button className="btn" onClick={() => this.startTimer()}>Start</button>}
        {(status !== 'off') && <button className="btn" onClick={() => this.stopTimer()}>Stop</button>}
        <button className="btn btn-close" onClick={this.closeApp}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
