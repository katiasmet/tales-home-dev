import React from 'react';
import {Match, BrowserRouter as Router} from 'react-router';

import {Home, Register, Login} from '../pages/';

const App = () => {
  return (
    <Router>
      <div className='main'>
        <Match
          exactly pattern='/'
          component={Home}
        />
        <Match
          exactly pattern='/login'
          component={Login}
        />
        <Match
          exactly pattern='/register'
          component={Register}
        />
      </div>
    </Router>
  );
};

export default App;
