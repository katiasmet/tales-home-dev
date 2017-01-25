import React from 'react';
import {Match, BrowserRouter as Router, Redirect} from 'react-router';

import {Home, Register, Login, Join, Families} from '../pages/';

const App = () => {
  const loggedIn = false;

  return (
    <Router>
      <div className='main'>

        <Match
          pattern='/'
          exactly render={() => (
            loggedIn ? (<Redirect to='/families' />)
            : (<Home />)
          )}
        />

        <Match
          exactly pattern='/login'
          component={Login}
        />

        <Match
          exactly pattern='/register'
          component={Register}
        />

        <Match
          exactly pattern='/join'
          component={Join}
        />

        <Match
          exactly pattern='/families'
          component={Families}
        />
      </div>
    </Router>
  );
};

export default App;
