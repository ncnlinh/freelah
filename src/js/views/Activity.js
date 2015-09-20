import React from 'react';
import {PropTypes, Link} from 'react-router'
import {AppStore, ActivityStore} from '../stores';
import AppActions from '../actions/AppActions';
import ActivityActions from '../actions/ActivityActions';
import {Grid, Row, Col} from 'react-bootstrap';
import {TextField, RaisedButton} from 'material-ui';
import mui from 'material-ui';

let ThemeManager = new mui.Styles.ThemeManager();

class Activity extends React.Component {

  constructor(props) {
    super(props);
    this.user = AppStore.getState().user;
    this.state = ActivityStore.getState();
    this.onChange = this.onChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    ActivityStore.listen(this.onChange);
    ActivityActions.getActivity(this.user.id, this.user.basicAuth);
  }

  ComponentWillUnMount() {
    ActivityStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleUpdate(e) {
    ActivityActions.getActivity(this.user.id, this.user.basicAuth);
  }

  render() {
    return (
      <div> {this.state}</div>
    );
  }

}
Activity.childContextTypes = {
  muiTheme: React.PropTypes.object
};
Activity.contextTypes = {
  history: PropTypes.history
}

export default Activity;

