import React from 'react';
import './index.css';

class Apple extends React.Component {
  spawnApple() {
    return (
      <div
        className="apple"
        style={{
          width: this.props.itemprop.distRatio - 4,
          height: this.props.itemprop.distRatio - 4,
          margin: -this.props.itemprop.distRatio / 2 - 2,
          borderRadius: this.props.itemprop.distRatio / 2,
          // Location = square*ratio + offset
          left: this.props.value * this.props.itemprop.distRatio + this.props.itemprop.distRatio*0.6 + 'px',
          top: this.props.index * this.props.itemprop.distRatio + this.props.itemprop.distRatio*0.6 + 'px'
        }}
      ></div>
    );
  }

  render() {
    const apple = this.spawnApple();
    return (
      <div>{apple}</div>
    )
  }
}

export default Apple;