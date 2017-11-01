import React, { Component } from 'react';

class HeaderContainer extends Component {
  render() {
    return (
      <div style={ styles.container }>
        <p style={ styles.data } >{ this.props.damagesPerSecond } dégâts/s</p>
        <p style={ styles.data } >{ this.props.money } argent</p>
        <p style={ styles.data } >0 zombies tués</p>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',

    padding: 20,
    backgroundColor: 'green',
  },
  data: {
    fontSize: 18,

    margin: 0,
  },
};

export default HeaderContainer;
