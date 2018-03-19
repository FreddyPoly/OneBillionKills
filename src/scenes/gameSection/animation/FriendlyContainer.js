import React, { Component } from 'react';
import SpriteAnimator from '../../../../node_modules/react-sprite-animator/lib';

class FriendlyContainer extends Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={ styles.general } >
          <div style={{position: 'relative'}}>
            <div style={{position: 'absolute', right: 0}}>
              <SpriteAnimator
                width={72}
                height={72}
                fps={5}
                sprite={this.props.bestWeapon.animation} />
            </div>

            { this.props.upgradesAllies[0].level > 0 ?
              <div style={{position: 'absolute', right: 80}}>
                <SpriteAnimator
                  width={72}
                  height={72}
                  fps={5}
                  sprite={this.props.upgradesAllies[0].animation} />
              </div>
            :
              null }
            
            { this.props.upgradesAllies[1].level > 0 ?
              <div style={{position: 'absolute', right: 150}}>
                <SpriteAnimator
                  width={72}
                  height={72}
                  fps={5}
                  sprite={this.props.upgradesAllies[1].animation} />
              </div>
            :
              null }
              
            { this.props.upgradesAllies[2].level > 0 ?
              <div style={{position: 'absolute', right: 210}}>
                <SpriteAnimator
                  width={72}
                  height={72}
                  fps={5}
                  sprite={this.props.upgradesAllies[2].animation} />
              </div>
            :
              null }
              
            { this.props.upgradesAllies[3].level > 0 ?
              <div style={{position: 'absolute', right: 280}}>
                <SpriteAnimator
                  width={72}
                  height={72}
                  fps={5}
                  sprite={this.props.upgradesAllies[3].animation} />
              </div>
            :
              null }
              
            { this.props.upgradesAllies[4].level > 0 ?
              <div style={{position: 'absolute', right: 360}}>
                <SpriteAnimator
                  width={72}
                  height={72}
                  fps={5}
                  sprite={this.props.upgradesAllies[4].animation} />
              </div>
            :
              null }
              
            { this.props.upgradesAllies[5].level > 0 ?
              <div style={{position: 'absolute', right: 450}}>
                <SpriteAnimator
                  width={72}
                  height={72}
                  fps={5}
                  sprite={this.props.upgradesAllies[5].animation} />
              </div>
            :
              null }
              
            { this.props.upgradesAllies[6].level > 0 ?
              <div style={{position: 'absolute', right: 520}}>
                <SpriteAnimator
                  width={72}
                  height={72}
                  fps={5}
                  sprite={this.props.upgradesAllies[6].animation} />
              </div>
            :
              null }
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
    backgroundColor: 'lightgreen'
  },
  general: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: 10
  },
};

export default FriendlyContainer;
