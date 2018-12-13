import React from 'react';
import './index.css';

let distRatio = 20;

class Snake extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
  render () {
    const snake = this.props.value.map((local, index) => {
      if (local.sx < 0) local.sx = 19;
      if (local.sx > 19) local.sx = 0;
      if (local.sy < 0) local.sy = 19;
      if (local.sy > 19) local.sy = 0;
      
      return(
      <div 
        key={index} // Fix! (make actually unique)
        className="snakepiece" 
        style={{
          left: (+local.sx)*distRatio + 10 + 'px',
          top: (+local.sy)*distRatio + 10 + 'px'
        }}
      ></div>
      )
    })

    return (
      <div>{snake}</div>
    )
  }
}

export default Snake;