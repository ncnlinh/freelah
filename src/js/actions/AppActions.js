import alt from '../alt';
import api from '../api';

class AppActions {
  login(username, password) {
    this.dispatch();
    api.login({username, password})
      .then((res) => {
        console.log(res);
        this.actions.loginSuccess(JSON.parse(res.text));
      })
      .catch((err) => {
        console.log(err);
        this.actions.loginFailed(err.body);
      });
  }
  loginSuccess(token) {
    this.dispatch(token);
  }
  loginFailed(err) {
    this.dispatch(err);
  }

  logout() {
    this.dispatch();
  }

  signup(username, email, phone, password) {
    this.dispatch();
    api.createUser({username, email, phone, password})
      .then((res) => {
        console.log(res);
        this.actions.signupSuccess(JSON.parse(res.text));
      })
      .catch((err) => {
        console.log(err);
        this.actions.signupFailed(err.body);
      });
  }
  signupSuccess(user) {
    this.dispatch(user);
  }
  signupFailed(err) {
    this.dispatch(err);
  }

  startSignup() {
    if (this.alt.dispatcher.isDispatching()){
      window.setTimeout(() => {
        this.dispatch();
      })
    } else {
      this.dispatch();
    }
  }

}

export default alt.createActions(AppActions);
