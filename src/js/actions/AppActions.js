import alt from '../alt';
import api from '../api';

class AppActions {
  login(username, password) {
    //this.dispatch();
    api.login({'username': username, 'password': password})
      .then((res) => {
        console.log(res);
        this.actions.loginSuccess(JSON.parse(res.text));
      })
      .catch((err) => {
        this.actions.loginFailed(err.body);
      });
  }
  loginSuccess(token) {
    this.dispatch(token);
  }
  loginFailed(err) {
    this.dispatch(err);
  }
}

export default alt.createActions(AppActions);
