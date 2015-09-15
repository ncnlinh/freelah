import alt from '../alt';
import AppActions from '../actions/AppActions';

class AppStore {
  constructor() {
    this.isLoggedIn = false;
    this.user = null;
    this.error = null;
    this.bindListeners({
      handleLoginSuccess: AppActions.loginSuccess,
      handleLoginFailed: AppActions.loginFailed,
    })
  }

  handleLoginSuccess(user) {
    this.isLoggedIn = true;
    this.user = user;
    this.error = null;
  }

  handleLoginFailed(err) {
    this.isLoggedIn = false;
    this.user = null;
    this.error = err;
  }
}

export default alt.createStore(AppStore, 'AppStore');

