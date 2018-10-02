import React, { Component } from 'react';

import FriendlyContainer from './animation/FriendlyContainer';
import FoesContainer from './animation/FoesContainer';
import Statistics from './statistics/Statistics';

import fund from '../../assets/fund.jpg';

class GameSection extends Component {
  render() {
    return (
      <div style={styles.container}>
        <img src={fund} alt='larue' style={{ position: 'absolute', zIndex: -1, bottom: '10rem', width: '100%', height: '100%' }} />

        <Statistics damagesPerSecond={this.props.damagesPerSecond} money={this.props.money} zombiesAmount={this.props.zombiesAmount} />

        <section style={styles.container}>
          <FriendlyContainer bestWeapon={this.props.bestWeapon} upgradesAllies={this.props.upgradesAllies} />
        </section>

        <section style={styles.container}>
          <FoesContainer manualDamages={this.props.manualDamages} foes={this.props.foes} basicFoes={this.props.basicFoes} />
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

export default GameSection;
