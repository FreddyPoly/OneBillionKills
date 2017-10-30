import React, { Component } from 'react';
import UpgradesContainer from './upgrades/UpgradesContainer.js';
import HeaderContainer from './header/HeaderContainer.js';

import upgradesWeapons from '../assets/data/upgradesWeapons.json';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      upgradesWeapons: [],
      damagesPerSecond: 0.1,
    };
  }

  componentWillMount = () => {
    this.setState({upgradesWeapons});
  }

  triggerUpgrade = (index) => {
    // Mise à jour du niveau de l'upgrade
    const tmpUpgradesWeapons = this.state.upgradesWeapons;
    tmpUpgradesWeapons[index].level += 1;
    this.setState({upgradesWeapons: tmpUpgradesWeapons});

    // Mise à jour des dégâts par seconde
    const tmpDamages = parseFloat(this.state.damagesPerSecond) + parseFloat(this.state.upgradesWeapons[index].damages);
    this.setState({damagesPerSecond: tmpDamages.toFixed(2)});
  }

  render() {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    return (
      <div className="Main" style={{height: windowHeight, width: windowWidth, display: 'flex', flex: 1, flexDirection: 'column'}}>
        <section style={styles.header}>
          <HeaderContainer />
        </section>

        <section style={styles.gameSection}>
          <UpgradesContainer upgradesWeapons={this.state.upgradesWeapons} triggerUpgrade={this.triggerUpgrade} />

          <div style={styles.anim}>
            <p>{ this.state.damagesPerSecond } dégâts / s</p>
          </div>

          <UpgradesContainer upgradesWeapons={this.state.upgradesWeapons} triggerUpgrade={this.triggerUpgrade} />
        </section>

      </div>
    );
  }
}

const styles = {
  header: {
    display: 'flex',
    flex: 1,
  },
  gameSection: {
    display: 'flex',
    flex: 5,
    flexDirection: 'row',
  },
  anim: {
    display: 'flex',
    flex: 3,

    padding: 20,
    backgroundColor: 'red',
  },
};

export default Main;
