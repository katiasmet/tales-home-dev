import React from 'react';
import {Match, BrowserRouter as Router} from 'react-router';

import {Home, Admin, Login} from '../pages/';

const App = () => {
  return (
    <Router>
      <div className='main'>
        <Match
          exactly pattern='/'
          component={Home}
        />
        <Match
          exactly pattern='/admin'
          component={Admin}
        />
        <Match
          exactly pattern='/login'
          component={Login}
        />
      </div>
    </Router>
  );
};

export default App;
