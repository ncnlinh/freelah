import React from 'react';
import {PropTypes} from 'react-router'
import {AppStore} from '../stores';
import AppActions from '../actions/AppActions';
import {Button, Grid, Row, Col, Input} from 'react-bootstrap';
import LocalStore from '../util/helper.js'

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = AppStore.getState();
    this.onChange = this.onChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    if (this.state.user) {
      this.context.history.pushState(null, '/');
    }
    AppStore.listen(this.onChange);
  }

  ComponentWillUnMount() {
    AppStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
    if (this.state.isLoggedIn) {
      // AppStore.unlisten(this.onChange);   
      console.log(state);
      this.context.history.pushState(null, '/');
    } else if (this.state.error) {
      // error handler
      console.log(state);
    }
  }

  handleLogin(e) {
    e.preventDefault();

    let username = this.refs.username.getInputDOMNode().value;
    let password = this.refs.password.getInputDOMNode().value

    AppActions.login(username, password);
  }

  render() {
    let style = this.state.error ? 'error' : null;
    return (
      <Grid>
        <div className="fl-auth lead">
        <Row>
            <Col xs={3} md={4}/>
            <Col xs={6} md={4}>
              <h1>Freelah</h1>
            </Col>
            <Col xs={3} md={4}/>
        </Row>
        <Row>
            <Col xs={3} md={4}/>
            <Col xs={6} md={4}>
              <form bsStyle="inline" onSubmit={this.handleLogin}>
                <Input bsStyle={style} ref="username" name="username" type="username" placeholder="Username" required={true}/>
                <Input bsStyle={style} ref="password" name="password" type="password" placeholder="Password" required={true} minLength={5}/>
                <Button type="submit" bsStyle="success" onClick={this.handleLogin}>
                  Log in
                </Button>
              </form>

            </Col>
            <Col xs={3} md={4}/>
        </Row>
        </div>
      </Grid>
    );
  }

}

Login.contextTypes = {
  history: PropTypes.history
}

export default Login;

