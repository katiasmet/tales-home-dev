import React from 'react';
import {Match, BrowserRouter as Router} from 'react-router';

import {Home, Login, EditProfile, Families, NewFamily, Models, StartSession} from '../pages/';
import {RedirectWhenAuthorized, MatchWhenAuthorized} from './checkRoutes';

export default () => (

  <Router>
    <div className='main'>

      <RedirectWhenAuthorized pattern='/' component={Home} />

      <RedirectWhenAuthorized pattern='/login' component={Login} />
      <RedirectWhenAuthorized pattern='/register' component={Login} />
      <Match exactly pattern='/join' component={Login} />
      <MatchWhenAuthorized pattern='/editprofile' component={EditProfile} />

      <MatchWhenAuthorized pattern='/families' component={Families} />
      <MatchWhenAuthorized pattern='/newfamily' component={NewFamily} />
      <MatchWhenAuthorized pattern='/startsession' component={StartSession} />

      <MatchWhenAuthorized pattern='/models' component={Models} />

    </div>
  </Router>

);
