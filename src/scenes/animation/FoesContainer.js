import React, { Component } from 'react';

class FoesContainer extends Component {
  render() {
    return (
      <div style={styles.container}>
        <p>Méchants</p>
        <button style={{ height: 80, width: 80, backgroundColor: 'gold' }} onClick={this.props.manualDamages} ></button>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gold'
  },
};

export default FoesContainer;
