import React from 'react';
import './index.css';

class Score extends React.Component {
  render () {
    return (
      <div className="scoreboard" >
        <div className="halfboard" >
          <div className="board-word" >Score</div>
          <div className="board-num" >{this.props.value}</div>
        </div>
        <div className="halfboard">
          <div className="board-word" >High Score</div>
          <div className="board-num" >{this.props.index}</div>
        </div>
      </div>
    )
  }
}

export default Score;