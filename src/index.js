import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Snake from './Components/Snake.js';
import Apple from './Components/Apple.js';
import Score from './Components/Score.js';

class Game extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      // Apple location
      ax: Math.floor( Math.random()*20 ),
      ay: Math.floor( Math.random()*20 ),

      // Locations of every piece of the snake
      locations: [
        {sx: 10, sy: 10, id: 5},
        {sx: 10, sy: 11, id: 4},
        {sx: 10, sy: 12, id: 3},
        {sx: 10, sy: 13, id: 2},
        {sx: 10, sy: 14, id: 1}
      ],

      // Snake velocity
      xv: 0,
      yv: 0,

      // Inverted start direction
        // stops snake from turning into itself (see keypress handle)
      invStartDir: "down", 

      score: 0,
      highScore: 0,

      dimensions: this.setDimensions()
    }
  }


  // Game Dimensions
  setDimensions = () => {
    let gameWidth = 500,
        gameHeight = gameWidth,
        gameBorder = 8,
        scoreBorder = 5,
        scoreHeight = 110,
        scoreWidth = (gameWidth + gameBorder*2) - (scoreBorder*4),
        distRatio = gameWidth /20,
        viewTop = (document.documentElement.clientHeight - (gameHeight + gameBorder*2 + scoreHeight + scoreBorder*3))/2,
        viewLeft = (document.documentElement.clientWidth - (gameWidth + gameBorder*2))/2

    let dimensions = {
      gameWidth,
      gameHeight,
      gameBorder,

      scoreBorder,
      scoreHeight,
      scoreWidth,

      viewLeft,
      viewTop,
      distRatio
    }

    return dimensions;
  }

  // Spawn Functions
  spawnApple = location => {
    let applex = Math.floor( Math.random() * 20);
    let appley = Math.floor( Math.random() * 20);
    
    // Prevent spawning on snake
    for (let i = 0; i < location.length; i++) {
      // If collision
      if (applex === location[i].sx && appley === location[i].sy) {
        applex = Math.floor( Math.random()*20 );
        appley = Math.floor( Math.random()*20 );
        i = 0; // start test again
      }
    }
    this.setState({
      ax: applex,
      ay: appley
    })
  }

  // Collision Tests
  appleCollision = location => {
    if (
      location[0].sx === (this.state.ax) &&
      location[0].sy === (this.state.ay)
      ) {
      // New apple and score++
      this.spawnApple(location);
      var increment = this.state.score + 1;
      this.setState({
        score: increment
      });
    }
    else { // pop tail piece if apple isn't eaten
      location.pop(location.length - 1)
    }

  }
  bodyWallCollisions = location => {
    for (let i = 1; i < location.length; i++) {
      if (  // Checks if head hits a body piece or a wall
        (location[i].sx === location[0].sx &&
        location[i].sy === location[0].sy) ||
        location[0].sx < 0 || location[0].sx > 19 ||
        location[0].sy < 0 || location[0].sy > 19
      ) {
        // If collision detected check if new high score
        let newScore = 0;
        if (this.state.score > this.state.highScore) {
          newScore = this.state.score;
        } else {
          newScore = this.state.highScore;
        }
        // Reset game
        this.setState({
          locations: [
            {sx: 10, sy: 10, id: 5},
            {sx: 10, sy: 11, id: 4},
            {sx: 10, sy: 12, id: 3},
            {sx: 10, sy: 13, id: 2},
            {sx: 10, sy: 14, id: 1}
          ],
          xv: 0,
          yv: 0,
          inStartDir: "down",
          highScore: newScore,
          score: 0,
        })
        return true;
      }
    }
  }

  // Movement Functions
  setInverseDir = () => {
    // Sets the inverse direction so snake can't turn into itself
    if (this.state.yv === -1) this.setState({ invStartDir: "down" });
    else if (this.state.yv === 1) this.setState({ invStartDir: "up" });
    else if (this.state.xv === -1) this.setState({ invStartDir: "right" });
    else if (this.state.xv === 1) this.setState({ invStartDir: "left" });
  }
  moveSnake = location => {
    this.setInverseDir();
    let obj = {
      sx: location[0].sx + this.state.xv,
      sy: location[0].sy + this.state.yv,
      id: location[0].id + 1
    };

    location.unshift(obj);
    return location;
  }


  // Functions for every new frame
  nextFrame = () => {
    // Update dimensions if screen size changes
    let dimensions = this.setDimensions();
    
    // Update location
    let locals = this.state.locations;
    locals = this.moveSnake(locals);


    // if there is collision, skip rest of fnc
    if (this.bodyWallCollisions(locals)) return;

    // Apple eating test
    this.appleCollision(locals);

    // Save location after tests
    this.setState({
      locations: locals,
      dimensions
    });
  }
  
  // Lifecycle Methods
  componentDidMount = () => {
    // game renders 10 frames a second
    this.intervalId = setInterval(this.nextFrame, 1000/10);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  // Controls
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
      <div
      className="viewport"
      style={{
        top: this.state.dimensions.viewTop,
        left: this.state.dimensions.viewLeft
      }}
      >
        <Score
          score={this.state.score}
          highScore={this.state.highScore}
          dims={this.state.dimensions}
        />
        <div
          className="game"
          onKeyDown={this.handleKeyPress}
          tabIndex="0"
          style={{
            width: this.state.dimensions.gameWidth,
            height: this.state.dimensions.gameHeight,
            top: (this.state.dimensions.scoreHeight + this.state.dimensions.scoreBorder*2)+ 'px',
            left: (this.state.gameBorder) + 'px'
          }}
        >
          <Snake
            locations={this.state.locations}
            dims={this.state.dimensions}
          />
          <Apple 
            ax={this.state.ax}
            ay={this.state.ay}
            dims={this.state.dimensions}
          />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Game />, document.getElementById("root"))