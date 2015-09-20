import alt from '../alt';
import ActivityActions from '../actions/ActivityActions';

class ActivityStore {
  constructor() {
    this.activities = null;
    this.error = null;
    this.bindListeners({
      handleGetActivity: ActivityActions.GET_ACTIVITY,
      handleGetActivitySuccess: ActivityActions.GET_ACTIVITY_SUCCESS,
      handleGetActivityFailed: ActivityActions.GET_ACTIVITY_FAILED,
    })
  }

  handleGetActivity() {
  }

  handleGetActivitySuccess(res) {
    this.activities = res.reverse();
    this.error = null
  }

  handleGetActivityFailed(err) {
    this.error = err;
    this.activities = null
  }
}

export default alt.createStore(ActivityStore, 'ActivityStore');

