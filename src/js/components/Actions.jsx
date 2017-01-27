import React from 'react';

import {Action} from './';

const Actions = (actionClass, actions) => {
  return (
    <ul className={`actions ${actionClass}`} >

      {
        actions.map((action, id) => {
          <Action {...action} key={id} />;
        })
      }

    </ul>
  );
};

export default Actions;
