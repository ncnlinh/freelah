import superagent from 'superagent-bluebird-promise';
import config from './config';
console.log(config);
const SERVER_URL = config.api.serverUrl;
let FreeLahApi = {};

FreeLahApi.getAllUsers = () => {
  return superagent.get(SERVER_URL + '/api/users')
    .promise();;
}

FreeLahApi.getUser = (id) => {
  return superagent.get(SERVER_URL + '/api/users/'+id)
    .promise();;
}

FreeLahApi.createUser = (data) => {
  return superagent.post(SERVER_URL + '/api/users')
    .send(data)
    .promise();;
}

FreeLahApi.updateUser = (id, data) => {
  return superagent.put(SERVER_URL + '/api/users/'+id)
    .send(data)
    .promise();;
}

FreeLahApi.getAllProducts = () => {
  return superagent.get(SERVER_URL + '/api/products')
    .promise();;
}

FreeLahApi.getProduct = (productId) => {
  return superagent.get(SERVER_URL + '/api/products/' + productId)
    .promise();;
}

FreeLahApi.createProduct = (user, productData) => {
  console.log(productData);
  return superagent.post(SERVER_URL + '/api/users/' + user.id + '/products')
    .set('Authorization', user.basicAuth)
    .send(productData)
    .promise();;
}

FreeLahApi.updateProduct = (userId, productId, data) => {
  return superagent.put(SERVER_URL + '/api/users/' + userId + '/products/' + productId)
    .send(data)
    .promise();;
}

FreeLahApi.login = (data) => {
  return superagent.get(SERVER_URL + '/api/auth/')
    .query(data)
    .promise();;
}

export default FreeLahApi;
