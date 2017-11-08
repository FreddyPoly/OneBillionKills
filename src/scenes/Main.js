import React, { Component } from 'react';
import UpgradesContainer from './upgrades/UpgradesContainer';
import HeaderContainer from './header/HeaderContainer';
import LoadingPage from './elements/LoadingPage';

import upgradesWeapons from '../assets/data/upgradesWeapons.json';

import localStorage from '../services/localStorage';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      upgradesWeapons: [],
      damagesPerSecond: 0.1,
      money: 0,
      zombiesAmount: 0,

      initialiazing: true,
    };
  }

  componentWillMount = async () => {
    // Charger les données à partir du local storage
    const tmpMoney = await localStorage.getCurrentMoney();
    await this.setState({money: tmpMoney !== null ? tmpMoney : 0});

    const tmpZombiesAmount = await localStorage.getZombiesAmount();
    await this.setState({zombiesAmount: tmpZombiesAmount !== null ? tmpZombiesAmount : 0});

    const savedUpgrades = await localStorage.getUpgradesWeapons();

    if (savedUpgrades !== null) {
      const tmpUpgradesWeapons = upgradesWeapons;
      
      for (let i = 0; i < savedUpgrades.length; i += 1) {
        const index = savedUpgrades[i].index;
        const level = savedUpgrades[i].level;
  
        tmpUpgradesWeapons[index].level = level;
      }
  
      await this.setState({upgradesWeapons: tmpUpgradesWeapons});
    } else {
      await this.setState({upgradesWeapons});
    }

    // Initialiser les boucles de jeu
    this._moneyLoop();

    this._saveLoop();

    this.setState({initialiazing: false});
  }

  _moneyLoop = () => {
    setInterval(() => {
      this.setState({money: (parseFloat(this.state.money) + parseFloat(this.state.damagesPerSecond)).toFixed(2)});
    }, 1000);
  }

  _saveLoop = () => {
    setInterval(() => {
      localStorage.saveCurrentMoney(this.state.money);
      localStorage.saveZombiesAmount(this.state.zombiesAmount);
      localStorage.saveUpgradesWeapons(this.state.upgradesWeapons);
    }, 10000);
  }

  _triggerUpgrade = (index, price) => {
    // Mise à jour de l'argent
    const tmpMoney = (parseFloat(this.state.money) - parseFloat(price)).toFixed(2);
    this.setState({money: tmpMoney});

    // Mise à jour du niveau de l'upgrade
    const tmpUpgradesWeapons = this.state.upgradesWeapons;
    tmpUpgradesWeapons[index].level += 1;
    this.setState({upgradesWeapons: tmpUpgradesWeapons});

    // Mise à jour des dégâts par seconde
    const tmpDamages = parseFloat(this.state.damagesPerSecond) + parseFloat(this.state.upgradesWeapons[index].damages);
    this.setState({damagesPerSecond: tmpDamages.toFixed(2)});
  }

  _manualDamages = () => {
    const tmpMoney = (parseFloat(this.state.damagesPerSecond) + parseFloat(this.state.money)).toFixed(2);
    this.setState({money: tmpMoney});
  }

  render() {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    return (
      <div className="Main">
        {this.state.initialiazing ?
          <LoadingPage />
        :
          <div style={{height: windowHeight, width: windowWidth, display: 'flex', flex: 1, flexDirection: 'column'}}>
            <section style={styles.header}>
              <HeaderContainer damagesPerSecond={this.state.damagesPerSecond} money={this.state.money} zombiesAmount={this.state.zombiesAmount} />
            </section>

            <section style={styles.gameSection}>
              <UpgradesContainer upgradesWeapons={this.state.upgradesWeapons} triggerUpgrade={this._triggerUpgrade} money={this.state.money} />

              <div style={styles.anim}>
                <button style={{ height: 80, width: 80, backgroundColor: 'gold' }} onClick={this._manualDamages} >
                </button>
              </div>

              <UpgradesContainer upgradesWeapons={this.state.upgradesWeapons} triggerUpgrade={this._triggerUpgrade} />
            </section>
          </div>
        }
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
    justifyContent: 'center',
    alignItems: 'center',

    padding: 20,
    backgroundColor: 'red',
  },
};

export default Main;
