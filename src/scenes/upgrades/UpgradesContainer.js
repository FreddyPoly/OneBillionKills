import React, { Component } from 'react';
import UpgradeCard from './UpgradeCard.js';

import upgradesWeapons from '../../assets/data/upgradesWeapons.json';

class UpgradesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div style={ styles.container }>
        {upgradesWeapons.map((upgrade) => (
          <UpgradeCard props={ upgrade } key={ upgrade.name }/>
        ))}
      </div>
    );
  }
}

const styles = {
  container: {
    width: 300,
    height: 500,
    padding: 10,
    overflow: 'auto',
    backgroundColor: 'blue',
  },
};

export default UpgradesContainer;
