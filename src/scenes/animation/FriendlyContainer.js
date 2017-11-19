import React, { Component } from 'react';
import SpriteAnimator from '../../../node_modules/react-sprite-animator/lib';

class FriendlyContainer extends Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={ styles.hero } >
          <SpriteAnimator
            width={72}
            height={72}
            fps={5}
            sprite={this.props.bestWeapon.animation} />
        </div>
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
    backgroundColor: 'lightgreen'
  },
  hero: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: 10
  }
};

export default FriendlyContainer;
