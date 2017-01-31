import React from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';

import {Home, Login, EditProfile, Families, NewFamily, Models, Model, StartSession} from '../pages/';
import {RedirectWhenAuthorized, MatchWhenAuthorized} from './checkRoutes';

export default () => (

  <Router>
    <div className='main'>

      <RedirectWhenAuthorized path='/' component={Home} />

      <RedirectWhenAuthorized path='/login' component={Login} />
      <RedirectWhenAuthorized path='/register' component={Login} />
      <Route exact path='/join' component={Login} />
      <MatchWhenAuthorized path='/editprofile' component={EditProfile} />

      <MatchWhenAuthorized path='/families' component={Families} />
      <MatchWhenAuthorized path='/newfamily' component={NewFamily} />
      <MatchWhenAuthorized path='/startsession' component={StartSession} />

      <MatchWhenAuthorized path='/models' component={Models} />
      <MatchWhenAuthorized path='/models/:id' component={Model} />

    </div>
  </Router>

);
