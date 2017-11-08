import React, { Component } from 'react';

class Popup extends Component {
  render() {
    return (
      <div style={styles.container}>
        <p style={styles.loading}>Données sauvegardées !</p>
      </div>
    );
  }
}

const styles = {
  container: {
    position: 'absolute',
    padding: 20,
    top: 10,
    right: 10,
    backgroundColor: 'blue'
  },
  loading: {
    fontSize: 16,
    color: 'white'
  }
};

export default Popup;
