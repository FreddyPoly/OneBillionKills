import React, { Component } from 'react';
import SpriteAnimator from '../../../../node_modules/react-sprite-animator/lib';

class FoesContainer extends Component {
  render() {
    return (
      <div
        style={styles.container}
        onClick={this.props.manualDamages} >
        <div style={ styles.general } >
          <div style={{position: 'relative', width: '100%'}}>

            { this.props.basicFoes.map((foe) => (
              <div
                key={foe.right.toString()}
                style={{position: 'absolute', right: `${foe.right}%`}}>
                <SpriteAnimator
                  width={72}
                  height={72}
                  fps={5}
                  startFrame={foe.startFrame}
                  sprite={foe.animation} />
              </div>
            )) }
          
            { this.props.foes.map((foe, index) => (
              <div
                key={index.toString()}
                style={{position: 'absolute', right: foe.right}}>
                <SpriteAnimator
                  width={72}
                  height={72}
                  fps={5}
                  sprite={foe.animation} />
            </div> ))}
          </div>
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
    backgroundColor: 'gold',
    cursor: 'pointer',
  },
  general: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
};

export default FoesContainer;
