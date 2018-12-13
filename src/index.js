import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Snake from './Snake.js';
import Apple from './Apple.js';
import Score from './Score.js';

//test
class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ax: Math.floor( Math.random()*20 ),
      ay: Math.floor( Math.random()*20 ),
      xv: 0,
      yv: -1,
      invStartDir: "down",
      score: 0,
      highScore: 0,
      locations: [
        {sx: 10, sy: 10, id: 5},
        {sx: 10, sy: 11, id: 4},
        {sx: 10, sy: 12, id: 3},
        {sx: 10, sy: 13, id: 2},
        {sx: 10, sy: 14, id: 1}
      ]
    }
  }
  
  nextFrame = () => {
    if (this.state.yv === -1) this.setState({ invStartDir: "down" });
    else if (this.state.yv === 1) this.setState({ invStartDir: "up" });
    else if (this.state.xv === -1) this.setState({ invStartDir: "right" });
    else if (this.state.xv === 1) this.setState({ invStartDir: "left" });
    
    let locals = this.state.locations;
    let obj = {
      sx: locals[0].sx + this.state.xv,
      sy: locals[0].sy + this.state.yv,
      id: locals[0].id + 1
    }
    locals.unshift(obj);

    // Collision tests
    for (let i = 1; i < locals.length; i++) {
      if (
        (locals[i].sx === locals[0].sx &&
        locals[i].sy === locals[0].sy) ||
        locals[0].sx < 0 || locals[0].sx > 19 ||
        locals[0].sy < 0 || locals[0].sy > 19
        ) {
          // If collision detected
          let newScore = 0;
          if (this.state.score > this.state.highScore) {
            newScore = this.state.score;
          } else {
            newScore = this.state.highScore;
          }
          this.setState({
            locations: [
              {sx: 10, sy: 10, id: 0},
              {sx: 10, sy: 11, id: 1},
              {sx: 10, sy: 12, id: 2},
              {sx: 10, sy: 13, id: 3},
              {sx: 10, sy: 14, id: 4}
            ],
            xv: 0,
            yv: -1,
            highScore: newScore,
            score: 0,
          })
          return;
        }
    }
    // Apple collision test
    if (
      locals[0].sx === (this.state.ax) &&
      locals[0].sy === (this.state.ay)
      ) {
      var applex = Math.floor( Math.random()*20 );
      var appley = Math.floor( Math.random()*20 );
      
      // Prevent spawning on snake
      for (let i = 0; i < locals.length; i++) {
        if (applex === locals[i].sx && appley === locals[i].sy) {
          applex = Math.floor( Math.random()*20 );
          appley = Math.floor( Math.random()*20 );
          i = 0;
        }
      }
      // New apple and score++
      var increment = this.state.score + 1;
      this.setState({
        ax: applex,
        ay: appley,
        score: increment
      })
    }
    // 
    else {
      locals.pop(locals.length - 1)
    }
    this.setState({
      locations: locals,
    })
  }

  componentDidMount = () => {
    this.intervalId = setInterval(this.nextFrame, 1000/10);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  handleKeyPress = event => {
    if ((event.keyCode === 37) || (event.key === "a")) {
      if (this.state.invStartDir !== "left"){
        this.setState({
          xv: -1,
          yv: 0
        });
      }
    } else if ((event.keyCode === 38) || (event.key === "w")) {
      if (this.state.invStartDir !== "up"){
        this.setState({
          xv: 0,
          yv: -1
        });
      }
    } else if ((event.keyCode === 39) || (event.key === "d")) {
      if (this.state.invStartDir !== "right"){
        this.setState({
          xv: 1,
          yv: 0
        });
      }
    } else if ((event.keyCode === 40) || (event.key === "s")) {
      if (this.state.invStartDir !== "down"){
        this.setState({
          xv: 0,
          yv: 1
        });
      }
    }
  }

  render() {
    return (
      <div>
        <Score value={this.state.score} index={this.state.highScore} />
        <div className="border">
          <div className="viewport" onKeyDown={this.handleKeyPress} tabIndex="0">
            <Snake value={this.state.locations} />
            <Apple 
              value={this.state.ax}
              index={this.state.ay}
            />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Game />, document.getElementById("root"))