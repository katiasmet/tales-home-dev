import React from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';

import {Home, Login, EditProfile, Families, NewFamily, Models, Model, Family, NewFamilyMember, EditFamilyMember} from '../pages/';
import {RedirectWhenAuthorized, MatchWhenProfessional, MatchWhenFamily, MatchWhenAuthorized} from './checkRoutes';

export default () => (

  <Router>
    <div className='main'>

      <RedirectWhenAuthorized exact path='/' component={Home} />

      <RedirectWhenAuthorized exact path='/login' component={Login} />
      <RedirectWhenAuthorized exact path='/register' component={Login} />
      <Route exact path='/join' component={Login} />
      <MatchWhenProfessional exact path='/editprofile' component={EditProfile} />

      <MatchWhenProfessional exact path='/families' component={Families} />
      <MatchWhenProfessional exact path='/newfamily' component={NewFamily} />

      <MatchWhenAuthorized exact path='/models' component={Models} />
      <MatchWhenAuthorized exact path='/models/:id' component={Model} />

      <MatchWhenFamily exact path='/family' component={Family} />
      <MatchWhenFamily exact path='/newfamilymember' component={NewFamilyMember} />
      <MatchWhenFamily exact path='/editfamilymember/:id' component={EditFamilyMember} />

    </div>
  </Router>

);
