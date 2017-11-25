import React, { Component } from 'react';

import upgradesUtility from '../../services/upgradesUtility.js';

class UpgradeCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: 0
    };
  }

  onClick = () => {
    this.props.triggerUpgrade(this.props.upgradeType, this.props.index, this.state.price);
  }

  computePrice = (props) => {
    return upgradesUtility.computePrice(props.upgrade.price.a, props.upgrade.price.b, props.upgrade.level, props.upgrade.price.c);
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
      <div className="upgrade-card">
        {this.props.money < this.state.price ?
          (<div
            style={ styles.containerDisabled }>
            <div style={ styles.flexContainer }>
              <div style={styles.imgContainer}>
                <img
                  style={styles.icon}
                  alt={ this.props.upgrade.name }
                  src={ this.props.upgrade.icon } />
              </div>
              <div style={styles.textContainer}>
                <p>{this.props.upgrade.name} - {this.props.upgrade.level}</p>
                <p>Prix: {this.state.price}</p>
              </div>
            </div>
          </div>)
        :
          (<div
            style={ styles.container }
            onClick={this.onClick} >
            <div style={ styles.flexContainer }>
              <div style={styles.imgContainer}>
                <img
                  style={styles.icon}
                  alt={ this.props.upgrade.name }
                  src={ this.props.upgrade.icon } />
              </div>
              <div style={styles.textContainer}>
                <p>{this.props.upgrade.name} - {this.props.upgrade.level}</p>
                <p>Prix: {this.state.price}</p>
              </div>
            </div>
          </div>)
        }
      </div>
    );
  }
}

const styles = {
  container: {
    height: 120,

    backgroundColor: 'yellow',
    marginBottom: 20,
    padding: 20,
    cursor: 'pointer',
  },
  containerDisabled: {
    height: 120,
    
    backgroundColor: 'grey',
    marginBottom: 20,
    padding: 20,
  },
  flexContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 75,
    height: 75,
  },
  textContainer: {
    display: 'flex',
    flex: 2,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 10,
  },
};

export default UpgradeCard;
