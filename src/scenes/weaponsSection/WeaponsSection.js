import React, { Component } from 'react';

import AlliesWeapons from './weaponsTabs/AlliesWeapons';
import HeroWeapons from './weaponsTabs/HeroWeapons';

class GameSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHeroActive: true,
    };
  }

  changeActiveTab = (bool) => {
    this.setState({ isHeroActive: bool });
  }

  render() {
    return (
      <div className="weapons-section" style={styles.container}>
        <section style={styles.tabsContainer}>
          <div style={Object.assign({}, this.state.isHeroActive && styles.tabActive, styles.tabTitleContainer )} onClick={() => this.changeActiveTab(true)}>
            <p style={styles.tabTitle}>Armes Héro</p>
          </div>

          <div style={Object.assign({}, !this.state.isHeroActive && styles.tabActive, styles.tabTitleContainer )} onClick={() => this.changeActiveTab(false)}>
            <p style={styles.tabTitle}>Alliés</p>
          </div>
        </section>

        <section style={styles.weaponsContainer}>
          { this.state.isHeroActive ?
            <HeroWeapons upgrades={this.props.upgradeWeapons} money={this.props.money} triggerUpgrade={this.props.triggerUpgrade} />
          :
            <AlliesWeapons upgrades={this.props.upgradeAllies} money={this.props.money} triggerUpgrade={this.props.triggerUpgrade} />
          }
        </section>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    
    height: '100%',
  },
  tabsContainer: {
    flex: 1,
    backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabTitleContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
  },
  tabActive: {
    backgroundColor: 'yellow',
  },
  tabTitle: {
    margin: 0,
  },
  weaponsContainer: {
    flex: 8,
    backgroundColor: 'blue',
    overflow: 'auto',
  },
};

export default GameSection;
