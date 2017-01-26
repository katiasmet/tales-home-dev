import React from 'react';
import {Match, BrowserRouter as Router} from 'react-router';
import {Provider} from 'mobx-react';

import {Home, Login, Families} from '../pages/';
import {RedirectWhenAuthorized, MatchWhenAuthorized} from '../util/checkRoutes';

import stores from '../stores';

const App = () => {

  return (
    <Provider
      formLogin={stores.formLogin}
      formRegister={stores.formRegister}
    >

      <Router>
        <div className='main'>

        <RedirectWhenAuthorized pattern='/' component={Home} />
        <RedirectWhenAuthorized pattern='/login' component={Login} />
        <RedirectWhenAuthorized pattern='/register' component={Login} />
        <Match exactly pattern='/join' component={Login} />

        <MatchWhenAuthorized pattern='/families' component={Families} />

        </div>
      </Router>
    </Provider>
  );
};

export default App;
