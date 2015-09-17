import alt from '../alt';
import AppActions from '../actions/AppActions';
import LocalStore from '../util/helper.js'

class AppStore {
  constructor() {
    this.user = LocalStore.read('user');
    this.isLoggedIn = this.user ? true : false;
    this.error = null;
    this.bindListeners({
      handleLogin: AppActions.LOGIN,
      handleLoginSuccess: AppActions.LOGIN_SUCCESS,
      handleLoginFailed: AppActions.LOGIN_FAILED,
      handleLogout: AppActions.LOGOUT
    })
  }

  handleLogout() {
    this.isLoggedIn = false;
    this.user = null;
    this.error = null;
    LocalStore.remove('user');
  }

  handleLogin() {

  }

  handleLoginSuccess(user) {
    this.isLoggedIn = true;
    this.user = user;
    this.error = null;
    LocalStore.write('user', this.user);
  }

  handleLoginFailed(err) {
    this.isLoggedIn = false;
    this.user = null;
    this.error = err;
    LocalStore.remove('user');
  }
}

export default alt.createStore(AppStore, 'AppStore');

