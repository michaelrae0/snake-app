import React from 'react';
import './index.css';

class Snake extends React.Component {
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
          width: this.props.itemprop.distRatio - 2,
          height: this.props.itemprop.distRatio - 4,
          margin: -this.props.itemprop.distRatio / 2,
          borderRadius: this.props.itemprop.distRatio * 0.4,
          // location = square*ratio + offset
          left: local.sx*this.props.itemprop.distRatio + this.props.itemprop.distRatio/2 + 'px',
          top: local.sy*this.props.itemprop.distRatio + this.props.itemprop.distRatio/2 + 'px'
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