import ls from 'local-storage';

const saveCurrentMoney = money => ls.set('CURRENT_MONEY', money);

const getCurrentMoney = () => ls.get('CURRENT_MONEY');

const saveZombiesAmount = zombies => ls.set('ZOMBIES_AMOUNT', zombies);

const getZombiesAmount = () => ls.get('ZOMBIES_AMOUNT');

const saveUpgradesWeapons = upgrades => {
  const tmpUpgrades = [];

  for (let i = 0; i < upgrades.length; i += 1) {
    tmpUpgrades.push(upgrades[i].level);
  }

  ls.set('UPGRADES_WEAPONS', tmpUpgrades);
};

const getUpgradesWeapons = () => ls.get('UPGRADES_WEAPONS');

const localStorage = {};

localStorage.saveCurrentMoney = saveCurrentMoney;
localStorage.getCurrentMoney = getCurrentMoney;
localStorage.saveZombiesAmount = saveZombiesAmount;
localStorage.getZombiesAmount = getZombiesAmount;
localStorage.saveUpgradesWeapons = saveUpgradesWeapons;
localStorage.getUpgradesWeapons = getUpgradesWeapons;

export default localStorage;
