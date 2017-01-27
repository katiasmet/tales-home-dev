import React from 'react';
import {Provider} from 'mobx-react';

import Router from '../router/';
import stores from '../stores';

const App = () => {

  return (
    <Provider
      formLogin={stores.formLogin}
      formRegister={stores.formRegister}
      formEdit={stores.formEdit}
      formAddFamily={stores.formAddFamily}
      families={stores.families}
    >

      <Router />

    </Provider>
  );
};

export default App;
