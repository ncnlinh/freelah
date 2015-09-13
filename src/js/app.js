import React from 'react/addons';
import Views from './views';
import api from './api';

(function () {
  console.log(Views);
  console.log(api);
  React.render(<Views.App/>, document.body);
})();
