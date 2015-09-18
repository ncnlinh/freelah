import React from 'react';
import {PropTypes, Link} from 'react-router'
import {AppStore} from '../stores';
import AppActions from '../actions/AppActions';
import {Grid, Row, Col} from 'react-bootstrap';
import {TextField, RaisedButton} from 'material-ui';
import mui from 'material-ui';

let ThemeManager = new mui.Styles.ThemeManager();

class Login extends React.Component {

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

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

    let username = this.refs.username.refs.input.getDOMNode().value;
    let password = this.refs.password.refs.input.getDOMNode().value;
    AppActions.login(username, password);  
  }

  render() {
    let error = this.state.error ? ' ' : null;
    console.log(error)
    return (
      <Grid>
        <div className="fl-auth lead">
        <Row>
            <Col xs={3} md={4}/>
            <Col xs={6} md={4} style={{textAlign: 'center', paddingTop: '40px'}}>
              <h3>FreeLah</h3>
            </Col>
            <Col xs={3} md={4}/>
        </Row>
        <form bsStyle="inline" onSubmit={this.handleLogin}>
        <Row>
          <Col style={{paddingLeft: '20px', paddingRight:'20px'}}>
            <TextField ref="username" hintText="User Name" floatingLabelText="User Name" required={true} errorText={error} fullWidth/>
            <TextField ref="password" hintText="Password" floatingLabelText="Password" type="password" required={true} errorText={error} minLength={5} fullWidth/>
          </Col>
        </Row>
        <Row>
          <Col style={{'padding': '20px'}}>
            <RaisedButton type="submit" bsStyle="success" onClick={this.handleLogin} fullWidth>
              Log in
            </RaisedButton >
            <Link to={`/signup`} style={{textAlign: 'center', fontSize:'14px'}}>
                <p style={{paddingTop:'5px', color:'blue'}}>Don't have an account?</p>
            </Link>
          </Col>
        </Row>
        </form>
        </div>
      </Grid>
    );
  }

}
Login.childContextTypes = {
  muiTheme: React.PropTypes.object
};
Login.contextTypes = {
  history: PropTypes.history
}

export default Login;

