import React, { Component } from 'react';

import FriendlyContainer from './FriendlyContainer';
import FoesContainer from './FoesContainer';

class AnimationContainer extends Component {
  render() {
    return (
      <div style={styles.container}>
        <section style={styles.container}>
          <FriendlyContainer bestWeapon={this.props.bestWeapon} />
        </section>

        <section style={styles.container}>
          <FoesContainer manualDamages={this.props.manualDamages} />
        </section>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flex: 1,
  },
};

export default AnimationContainer;
