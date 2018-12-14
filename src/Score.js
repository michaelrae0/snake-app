import React from 'react';
import './index.css';

class Score extends React.Component {
  
  render () {
    let pixParInScore = this.props.itemprop;
    return (
      <div
        className="scoreboard"
        style={{
          fontSize: pixParInScore.distRatio * 3/2 + 'px',
          top: (pixParInScore.clientHeight - pixParInScore.viewHeight + 116) / 2 - 116 + (116 - this.props.itemprop.viewHeight / 4) + 'px',
          left: (pixParInScore.clientWidth	- pixParInScore.viewWidth - pixParInScore.viewBorder*2) / 2 + 'px'
        }}
      >
        <div 
          className="halfboard" 
          style={{
            width: pixParInScore.viewWidth/2 - 2,
            height: this.props.itemprop.viewHeight / 4 + 'px',
          }}
        >
          <div className="board-word" >Score</div>
          <div className="board-num" >{this.props.value}</div>
        </div>
        <div
          className="halfboard"
          style={{
            width: pixParInScore.viewWidth/2 - 2,
            height: this.props.itemprop.viewHeight / 4 + 'px',
          }}
        >
          <div className="board-word" >High Score</div>
          <div className="board-num" >{this.props.index}</div>
        </div>
      </div>
    )
  }
}

export default Score;