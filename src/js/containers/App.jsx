import React from 'react';
import {BrowserRouter as Router} from 'react-router';

import {Home, Login, Families} from '../pages/';
import {RedirectWhenAuthorized, MatchWhenAuthorized} from '../util/checkRoutes';

const App = () => {

  return (
    <Router>
      <div className='main'>

      <RedirectWhenAuthorized pattern='/' component={Home} />
      <RedirectWhenAuthorized pattern='/login' component={Login} />
      <RedirectWhenAuthorized pattern='/register' component={Login} />
      <RedirectWhenAuthorized pattern='/join' component={Login} />

      <MatchWhenAuthorized pattern='/families' component={Families} />

      </div>
    </Router>
  );
};

export default App;
