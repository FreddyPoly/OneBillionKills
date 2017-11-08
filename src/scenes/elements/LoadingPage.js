import React, { Component } from 'react';

class LoadingPage extends Component {
  render() {
    return (
      <div style={styles.container}>
        <p style={styles.loading}>Chargement des données de jeu...</p>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading: {
    fontSize: 28,
    fontWeight: '900',
    color: '#373737'
  }
};

export default LoadingPage;
