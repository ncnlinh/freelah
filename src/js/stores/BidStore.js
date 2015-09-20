import alt from '../alt';
import BidActions from '../actions/BidActions';

class BidStore {
  constructor() {
    this.isDone = null;
    this.error = null;
    this.bindListeners({
      handleBid: BidActions.BID,
      handleBidSuccess: BidActions.BID_SUCCESS,
      handleBidFailed: BidActions.BID_FAILED,
    })
  }

  handleBid() {
  }

  handleBidSuccess() {
    this.isDone = true;
  }

  handleBidFailed(err) {
    this.error = err;
  }
}

export default alt.createStore(BidStore, 'BidStore');

