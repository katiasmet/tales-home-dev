import React from 'react';
import {Match, BrowserRouter as Router, Redirect} from 'react-router';

import {Home, Login, Families} from '../pages/';
import {isLoggedIn} from '../auth';

const App = () => {
  return (
    <Router>
      <div className='main'>

        <Match
          pattern='/'
          exactly render={() => (
            isLoggedIn ? (<Redirect to='/families' />)
            : (<Home />)
          )}
        />

        <Match
          pattern='/login'
          exactly render={() => (
            isLoggedIn ? (<Redirect to='/families' />)
            : (<Login />)
          )}
        />

        <Match
          pattern='/register'
          exactly render={() => (
            isLoggedIn ? (<Redirect to='/families' />)
            : (<Login />)
          )}
        />

        <Match
          pattern='/join'
          exactly render={() => (
            isLoggedIn ? (<Redirect to='/families' />)
            : (<Login />)
          )}
        />

        <Match
          pattern='/families'
          exactly render={() => (
            isLoggedIn ? (<Families />)
            : (<Login />)
          )}
        />
      </div>
    </Router>
  );
};

export default App;
