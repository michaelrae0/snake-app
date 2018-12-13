import React from 'react';
import './index.css';

let distRatio = 20;

class Apple extends React.Component {
  spawnApple() {
    return (
      <div
        className="apple"
        style={{
          left: this.props.value * distRatio + 12 + 'px',
          top: this.props.index * distRatio + 12 + 'px'
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