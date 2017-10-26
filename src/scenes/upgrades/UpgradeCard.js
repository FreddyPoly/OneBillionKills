import React, { Component } from 'react';

class UpgradeCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount = () => {
    console.log(`${JSON.stringify(this.props)}`);
  }

  render() {
    return (
      <div style={ styles.container }>
        <img
          style={styles.icon}
          alt={ this.props.props.name }
          src={ this.props.props.icon } />
      </div>
    );
  }
}

const styles = {
  container: {
    height: 120,
    backgroundColor: 'yellow'
  },
  icon: {
    width: 50,
    height: 50
  }
};

export default UpgradeCard;
