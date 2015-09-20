import React from 'react';
import {PropTypes} from 'react-router'
import {AppStore} from '../stores';
import {AppActions} from '../actions';
import {Grid} from 'react-bootstrap';

class CountdownTimer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {seconds: this.props.seconds}
    this.interval = null;
    this.tick = this.tick.bind(this);
  }

  tick() {
    if (this.state.seconds <= 0) {
      clearInterval(this.interval);
    } else {
      this.setState({seconds: this.state.seconds - 1});
    }
  }

  componentDidMount() {
    this.setState({ seconds: this.props.seconds });
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    var hours = Math.floor(this.state.seconds / 3600);
    var minutes = Math.floor((this.state.seconds % 3600)/60);
    var seconds = Math.floor((this.state.seconds % 60));
    var text = 'Expired in: ' + hours +':'+ minutes +':'+ seconds;

    if (this.state.seconds == 0) {
      text = this.props.highestBid == 0 ? 'Status: expired' : 'Status: given';
      if (this.props.status == 'bidding') {
        text = 'First come first serve'
      }
    }

    return (
      <p>{text}</p>
    );
  }
}
CountdownTimer.propTypes = {
  seconds: React.PropTypes.number,
  highestBid: React.PropTypes.number,
  status: React.PropTypes.string
};

CountdownTimer.contextTypes = {
  history: PropTypes.history
}

export default CountdownTimer;

