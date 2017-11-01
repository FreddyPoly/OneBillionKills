import React, { Component } from 'react';
import UpgradeCard from './UpgradeCard.js';

class UpgradesContainer extends Component {
  render() {
    return (
      <div className="upgrades-container" style={ styles.container }>
        {this.props.upgradesWeapons.map((upgrade, index) => (
          <UpgradeCard upgrade={upgrade} index={index} key={upgrade.name} triggerUpgrade={this.props.triggerUpgrade} money={this.props.money} />
        ))}
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',

    padding: 20,
    overflow: 'auto',
    backgroundColor: 'blue',
  },
};

export default UpgradesContainer;
