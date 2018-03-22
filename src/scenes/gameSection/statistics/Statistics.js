import React, { Component } from 'react';

class Statistics extends Component {
  render() {
    return (
      <div style={styles.container} >
        <p style={ styles.data } ><strong>{ this.props.damagesPerSecond }</strong> dégâts/s</p>
        <p style={ styles.data } ><strong>{ this.props.money }</strong> argent</p>
        <p style={ styles.data } ><strong>{ parseInt(this.props.zombiesAmount, 10) }</strong> zombies tués</p>
      </div>
    );
  }
}

const styles = {
  container: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  data: {
    fontSize: 18,
    margin: 0,
    padding: 4,
  },
};

export default Statistics;
