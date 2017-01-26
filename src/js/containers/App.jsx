import React from 'react';
import {BrowserRouter as Router} from 'react-router';
import {Provider} from 'mobx-react';

import {Home, Login, Families} from '../pages/';
import {RedirectWhenAuthorized, MatchWhenAuthorized} from '../util/checkRoutes';

import stores from '../stores';

const App = () => {

  return (
    <Provider user={stores.user}>
      <Router>
        <div className='main'>

        <RedirectWhenAuthorized pattern='/' component={Home} />
        <RedirectWhenAuthorized pattern='/login' component={Login} />
        <RedirectWhenAuthorized pattern='/register' component={Login} />
        <RedirectWhenAuthorized pattern='/join' component={Login} />

        <MatchWhenAuthorized pattern='/families' component={Families} />

        </div>
      </Router>
    </Provider>
  );
};

export default App;
