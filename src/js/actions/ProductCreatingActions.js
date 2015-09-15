import alt from '../alt';
import api from '../api';

class ProductCreatingActions {
  uploadImage(image) {
    this.dispatch(image);
  }
}

export default alt.createActions(ProductCreatingActions);
