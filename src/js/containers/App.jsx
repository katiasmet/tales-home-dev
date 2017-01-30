import React from 'react';
import {Provider} from 'mobx-react';

import Router from '../router/';
import stores from '../stores';

const App = () => {

  return (
    <Provider
      formLogin={stores.formLogin}
      formRegister={stores.formRegister}
      formEditUser={stores.formEditUser}
      formAddFamily={stores.formAddFamily}
      families={stores.families}
      models={stores.models}
      notes={stores.notes}
      results={stores.results}
    >

      <Router />

    </Provider>
  );
};

export default App;
