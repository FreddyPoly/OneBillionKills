import React, { Component } from 'react';
import SpriteAnimator from '../../../node_modules/react-sprite-animator/lib';

class FriendlyContainer extends Component {
  render() {
    return (
      <div style={styles.container}>
        <p>Gentils</p>
        <p>Meilleure arme:</p>
        <p>{ this.props.bestWeapon.name }</p>
        <p>{ this.props.bestWeapon.level }</p>
        <p>{ this.props.bestWeapon.damages }</p>

        <SpriteAnimator
          width={72}
          height={72}
          fps={5}
          sprite={require('../../assets/weapons/test.svg')} />
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
    backgroundColor: 'lightgreen'
  },
};

export default FriendlyContainer;
