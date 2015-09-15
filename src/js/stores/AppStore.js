import alt from '../alt';
import AppActions from '../actions/AppActions';

class AppStore {
  constructor() {
    this.isLoggedIn = false;
    this.user = null;
    this.bindListeners({
      handleLoginSuccess: AppActions.LOGIN_SUCCESS,
      handleLoginFailed: AppActions.LOGIN_FAILED,
    })
  }

  handleLoginSuccess(user) {
    this.isLoggedIn = true;
    this.user = user;
  }

  handleLoginFailed(err) {

  }
}

export default alt.createStore(AppStore, 'AppStore');

