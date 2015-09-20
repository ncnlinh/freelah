import alt from '../alt';
import AppActions from '../actions/AppActions';
import LocalStore from '../util/helper.js'

class AppStore {
  constructor() {
    this.user = LocalStore.read('user');
    this.isLoggedIn = this.user ? true : false;
    this.error = null;
    this.signupSuccessful = null;
    this.showOnboardingAbout = false;
    this.showOnboardingDialog = false;
    this.bindListeners({
      handleLogin: AppActions.LOGIN,
      handleLoginSuccess: AppActions.LOGIN_SUCCESS,
      handleLoginFailed: AppActions.LOGIN_FAILED,
      handleLogout: AppActions.LOGOUT,
      handleSignup: AppActions.SIGNUP,
      handleSignupSuccess: AppActions.SIGNUP_SUCCESS,
      handleSignupFailed: AppActions.SIGNUP_FAILED,
      handleStartSignup: AppActions.START_SIGNUP,
      handleRetrieveNewUserInfo: AppActions.RETRIEVE_NEW_USER_INFO,
      handleRetrieveNewUserInfoSuccess: AppActions.RETRIEVE_NEW_USER_INFO_SUCCESS,
      handleRetrieveNewUserInfoFailed: AppActions.RETRIEVE_NEW_USER_INFO_FAILED,
      handleShowOnboardingAbout: AppActions.SHOW_ONBOARDING_ABOUT,
      handleShowOnboardingDialog: AppActions.SHOW_ONBOARDING_DIALOG
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

  handleSignup() {

  }

  handleSignupSuccess(user) {
    this.signupSuccessful = true;
    this.isLoggedIn = true;
    this.user = user;
    this.error = null;
    LocalStore.write('user', this.user);
  }

  handleSignupFailed(err) {
    this.signupSuccessful = false;
    this.isLoggedIn = false;
    this.user = null;
    this.error = err;
    LocalStore.remove('user');
  }

  handleStartSignup() {
    this.signupSuccessful = null;
  }

  handleRetrieveNewUserInfo() {
  }

  handleRetrieveNewUserInfoSuccess(data) {
    this.user = data;
    LocalStore.write('user', this.user);
  }
  handleRetrieveNewUserInfoFailed(error) {
    this.error = error;
  }

  handleShowOnboardingAbout() {
    this.showOnboardingAbout = true;
  }

  handleShowOnboardingDialog() {
    this.showOnboardingDialog = true;
  }
}

export default alt.createStore(AppStore, 'AppStore');

