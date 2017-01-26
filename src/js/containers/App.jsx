import React from 'react';
import {Provider} from 'mobx-react';

import Router from '../router/';
import stores from '../stores';

const App = () => {

  return (
    <Provider
      formLogin={stores.formLogin}
      formRegister={stores.formRegister}
    >

      <Router />

    </Provider>
  );
};

export default App;
