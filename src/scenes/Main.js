import React, { Component } from 'react';
import UpgradesContainer from './upgrades/UpgradesContainer';
import HeaderContainer from './header/HeaderContainer';
import LoadingPage from './elements/LoadingPage';
import Popup from './elements/Popup';
import AnimationContainer from './animation/AnimationContainer';

import upgradesWeapons from '../assets/data/upgradesWeapons';
import upgradesAllies from '../assets/data/upgradesAllies';

import localStorage from '../services/localStorage';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      upgradesWeapons: [],
      upgradesAllies: [],
      damagesPerSecond: 0.1,
      money: 0,
      zombiesAmount: 0,

      indexBestWeapon: 0,

      initialiazing: true,
      saving: false,
    };
  }

  componentWillMount = async () => {
    // Charger les données à partir du local storage
    const tmpMoney = await localStorage.getCurrentMoney();
    await this.setState({money: tmpMoney !== null ? tmpMoney : 0});

    const tmpZombiesAmount = await localStorage.getZombiesAmount();
    await this.setState({zombiesAmount: tmpZombiesAmount !== null ? tmpZombiesAmount : 0});

    const savedUpgradesWeapons = await localStorage.getUpgradesWeapons();
    const savedUpgradesAllies = await localStorage.getUpgradesAllies();

    const tmpUpgradesWeapons = upgradesWeapons;
    const tmpUpgradesAllies = upgradesAllies;
    let tmpDmg = 0;
    
    if (savedUpgradesWeapons !== null) {
      for (let i = 0; i < savedUpgradesWeapons.length; i += 1) {
        // Mise à jour du niveau de l'upgrade
        tmpUpgradesWeapons[i].level = savedUpgradesWeapons[i];

        // Mise à jour des dégâts par seconde
        tmpDmg += upgradesWeapons[i].damages * savedUpgradesWeapons[i];

        // Mise à jour de la meilleure arme
        if (savedUpgradesWeapons[i] > 0) {
          this.setState({indexBestWeapon: i});
        }
      }
    }

    if (savedUpgradesAllies !== null) {
      for (let i = 0; i < savedUpgradesAllies.length; i += 1) {
        // Mise à jour du niveau de l'upgrade
        tmpUpgradesAllies[i].level = savedUpgradesAllies[i];

        // Mise à jour des dégâts par seconde
        tmpDmg += upgradesAllies[i].damages * savedUpgradesAllies[i];
      }
    }

    await this.setState({upgradesWeapons: tmpUpgradesWeapons});
    await this.setState({upgradesAllies: tmpUpgradesAllies});
    await this.setState({damagesPerSecond: tmpDmg});

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
      localStorage.saveUpgradesAllies(this.state.upgradesAllies);

      this.setState({saving: true});
      setTimeout(() => this.setState({saving: false}), 2000);
    }, 10000);
  }

  _triggerUpgrade = (type, index, price) => {
    // Mise à jour de l'argent
    const tmpMoney = (parseFloat(this.state.money) - parseFloat(price)).toFixed(2);
    this.setState({money: tmpMoney});

    // Mise à jour du niveau de l'upgrade
    const tmpUpgrades = type === 'weapons' ? this.state.upgradesWeapons : this.state.upgradesAllies;
    tmpUpgrades[index].level += 1;
    if (type === 'weapons') {
      this.setState({upgradesWeapons: tmpUpgrades});
    } else {
      this.setState({upgradesAllies: tmpUpgrades});
    }

    // Mise à jour des dégâts par seconde
    const tmpDamages = type === 'weapons' ?
      parseFloat(this.state.damagesPerSecond) + parseFloat(this.state.upgradesWeapons[index].damages)
    :
      parseFloat(this.state.damagesPerSecond) + parseFloat(this.state.upgradesAllies[index].damages);
    this.setState({damagesPerSecond: tmpDamages.toFixed(2)});

    // Mise à jour de la meilleure arme achetée
    if (index > this.state.indexBestWeapon) this.setState({indexBestWeapon: index});
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
        {this.state.saving ?
          <Popup />
        :
          null
        }
        
        {this.state.initialiazing ?
          <LoadingPage />
        :
          <div style={{height: windowHeight, width: windowWidth, display: 'flex', flex: 1, flexDirection: 'column'}}>
            <section style={styles.header}>
              <HeaderContainer damagesPerSecond={this.state.damagesPerSecond} money={this.state.money} zombiesAmount={this.state.zombiesAmount} />
            </section>

            <section style={styles.gameSection}>
              <UpgradesContainer upgrades={this.state.upgradesWeapons} triggerUpgrade={this._triggerUpgrade} money={this.state.money} upgradeType='weapons' />

              <div style={styles.anim}>
                <AnimationContainer manualDamages={this._manualDamages} bestWeapon={this.state.upgradesWeapons[this.state.indexBestWeapon]} upgradesAllies={this.state.upgradesAllies} />
              </div>

              <UpgradesContainer upgrades={this.state.upgradesAllies} triggerUpgrade={this._triggerUpgrade} money={this.state.money} upgradeType='allies' />
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
  },
};

export default Main;
