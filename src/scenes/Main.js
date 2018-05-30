import React, { Component } from 'react';

import LoadingPage from './elements/LoadingPage';
import Popup from './elements/Popup';

import GameSection from './gameSection/GameSection';
import WeaponsSection from './weaponsSection/WeaponsSection';

import upgradesWeapons from '../assets/data/upgradesWeapons';
import upgradesAllies from '../assets/data/upgradesAllies';

import basicZombies from '../assets/data/basicZombies';
import zombies from '../assets/data/zombies';

import localStorage from '../services/localStorage';

class Main extends Component {
  constructor(props) {
    super(props);

    this.NB_ZOMBIES_MIN = 0;
    this.NB_ZOMBIES_MAX = 2;

    this.state = {
      upgradesWeapons: [],
      upgradesAllies: [],
      foes: [],

      basicFoes: basicZombies,

      nbZombiesMax: this.NB_ZOMBIES_MAX,
      nbZombiesMin: this.NB_ZOMBIES_MIN,

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
    const tmpMoney = await localStorage.getCurrentMoney();  // Argent
    await this.setState({money: tmpMoney !== null ? tmpMoney : 0});

    const tmpZombiesAmount = await localStorage.getZombiesAmount(); // Nombre de zombies tués
    await this.setState({zombiesAmount: tmpZombiesAmount !== null ? tmpZombiesAmount : 0});

    const savedUpgradesWeapons = await localStorage.getUpgradesWeapons(); // Niveau des armes
    const savedUpgradesAllies = await localStorage.getUpgradesAllies(); // Niveau des alliés

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

    // Calcul du nombre min et max de zombies à afficher
    this._computeNbZombies();

    // Initialiser les boucles de jeu
    this._moneyLoop();  // Gain d'argent
    this._zombieLoop(); // Zombies à afficher
    this._killZombieLoop(); // Nombre de zombies tués
    // TODO: REMETTRE LA SAUVEGARDE
    // this._saveLoop();  // Sauvegarde des données

    this.setState({initialiazing: false});
  }

  _computeNbZombies = () => {
    this.setState({nbZombiesMin: Math.min(this.NB_ZOMBIES_MIN + Math.floor(this.state.damagesPerSecond / 100), 10)});
    this.setState({nbZombiesMax: Math.min(this.NB_ZOMBIES_MAX + Math.floor(this.state.damagesPerSecond / 50), 13)});
  }

  _zombieLoop = () => {
    setInterval(async () => {
      this.setState({ foes: [] });

      // Nombre de zombies à afficher
      const nbZombies = Math.floor(Math.random() * this.state.nbZombiesMax) + this.state.nbZombiesMin;

      for (let i = 0; i < nbZombies; i += 1) {
        setTimeout(() => {
          if (this.state.foes.length < this.state.nbZombiesMax) {
            this.setState({ foes: [...this.state.foes, {
              ...zombies[Math.floor(Math.random() * zombies.length) + 0],
              right: Math.floor(Math.random() * 250) + 0,
            }] });
          }
        }, Math.floor(Math.random() * 500) + 0);
      }
    }, 3000);
  }

  _killZombieLoop = () => {
    // En partant du principe qu'un zombie a 10 points de vie
    setInterval(() => {
      this.setState({zombiesAmount: this.state.zombiesAmount + (parseFloat(this.state.damagesPerSecond).toFixed(2) / 10) });
    }, 1000);
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

    this._computeNbZombies();

    // Mise à jour de la meilleure arme achetée
    if (index > this.state.indexBestWeapon && type === 'weapons') this.setState({indexBestWeapon: index});
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
            <section style={styles.gameSection}>
              <GameSection bestWeapon={this.state.upgradesWeapons[this.state.indexBestWeapon]} upgradesAllies={this.state.upgradesAllies} manualDamages={this._manualDamages} foes={this.state.foes} basicFoes={this.state.basicFoes} damagesPerSecond={this.state.damagesPerSecond} money={this.state.money} zombiesAmount={this.state.zombiesAmount} />
            </section>

            <section style={styles.weaponsSection}>
              <WeaponsSection upgradeWeapons={this.state.upgradesWeapons} upgradeAllies={this.state.upgradesAllies} money={this.state.money} triggerUpgrade={this._triggerUpgrade} />
            </section>
          </div>
        }
      </div>
    );
  }
}

const styles = {
  weaponsSection: {
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
