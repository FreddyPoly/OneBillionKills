import React, { Component } from 'react';
import UpgradesContainer from './upgrades/UpgradesContainer.js';

import upgradesWeapons from '../assets/data/upgradesWeapons.json';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      upgradesWeapons: [],
    };
  }

  componentWillMount = () => {
    this.setState({upgradesWeapons});
  }

  triggerUpgrade = (index) => {
    const tmpUpgradesWeapons = this.state.upgradesWeapons;

    tmpUpgradesWeapons[index].level += 1;

    this.setState({upgradesWeapons: tmpUpgradesWeapons});
  }

  render() {
    return (
      <div className="Main">
        <UpgradesContainer upgradesWeapons={upgradesWeapons} triggerUpgrade={this.triggerUpgrade} />
      </div>
    );
  }
}

export default Main;
