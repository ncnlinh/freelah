import React from 'react/addons';
import Views from './views';
import api from './api';
import {Router, Route} from 'react-router';


(function () {
  console.log(Views);
  console.log(api);
  React.render((
    <Router>
      <Route path='/' component={Views.Home}/>
      <Route path='login' component={Views.Login}/>
      <Route path='products' component={Views.Home}/>
      <Route path='products/:id' component={Views.Product}/>
    </Router>
  ), document.body);
})();
