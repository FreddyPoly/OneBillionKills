import React, { Component } from 'react';

class HeaderContainer extends Component {
  render() {
    return (
      <div style={ styles.container }>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',

    padding: 20,
    overflow: 'auto',
    backgroundColor: 'green',
  },
};

export default HeaderContainer;
