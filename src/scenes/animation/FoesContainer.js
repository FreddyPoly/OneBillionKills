import React, { Component } from 'react';

class FoesContainer extends Component {
  render() {
    return (
      <div
        style={styles.container}
        onClick={this.props.manualDamages} >
        <p>Méchants</p>
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
    backgroundColor: 'gold',
    cursor: 'pointer',
  },
};

export default FoesContainer;
