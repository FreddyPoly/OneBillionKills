import React, { Component } from 'react';

import UpgradeCard from './upgrades/UpgradeCard';

class HeroWeapons extends Component {
  render() {
    return (
      <div className="hero-weapons" style={styles.container}>
        {this.props.upgrades.map((upgrade, index) => (
          <UpgradeCard upgrade={upgrade} key={upgrade.name} money={this.props.money} index={index} triggerUpgrade={this.props.triggerUpgrade} upgradeType='weapons' />
        ))}
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
  },
};

export default HeroWeapons;
