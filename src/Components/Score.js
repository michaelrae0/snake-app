import React from 'react';

class Score extends React.Component {
  
  render () {
    return (
      <div
        className="scoreboard"
        style={{
          fontSize: 40 + 'px'
        }}
      >
        <div 
          className="halfboard" 
          style={{
            width: this.props.dims.scoreWidth / 2,
            height: this.props.dims.scoreHeight + 'px',
          }}
        >
          <div className="board-word" ><span class="taller">Score</span></div>
          <div className="board-num" >{this.props.score}</div>
        </div>
        <div
          className="halfboard"
          style={{
            width: this.props.dims.scoreWidth / 2,
            height: this.props.dims.scoreHeight + 'px',
          }}
        >
          <div className="board-word" ><span class="taller">High Score</span></div>
          <div className="board-num" >{this.props.highScore}</div>
        </div>
      </div>
    )
  }
}

export default Score;