import React, { Component } from 'react';

import upgradesUtility from '../../../../services/upgradesUtility.js';

class UpgradeCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: 0
    };
  }

  buyUpgrade = () => {
    this.props.triggerUpgrade(this.props.upgradeType, this.props.index, this.state.price);
  }

  computePrice = (props) => {
    return upgradesUtility.computePrice(props.upgrade.price.a, props.upgrade.price.b, props.upgrade.level, props.upgrade.price.c, props.upgrade.price.d);
  }

  componentDidMount = () => {
    this.setState((prevState, props) => {
      return {price: this.computePrice(props)};
    });
  }

  componentWillReceiveProps = () => {
    this.setState((prevState, props) => {
      return {price: this.computePrice(props)};
    });
  }

  render() {
    return (
      <div className="upgrade-card" style={styles.container} onClick={this.props.money > this.state.price ? this.buyUpgrade : null}>
        <div
          style={styles.tabSection} >
          <img
            style={styles.icon}
            alt={ this.props.upgrade.name }
            src={ this.props.upgrade.icon } />

          <p style={styles.name}>{ this.props.upgrade.name } - {this.props.upgrade.level}</p>

          <p>Prix: {this.state.price}</p>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    minHeight: 130,
    minWidth: 230,

    backgroundColor: 'yellow',
    padding: 8,
    margin: 8,
    cursor: 'pointer',

    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    margin: 0,
  },
  icon: {
    width: 35,
    height: 35,
  },
};

export default UpgradeCard;
