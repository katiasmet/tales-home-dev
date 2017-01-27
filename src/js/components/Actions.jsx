import React, {PropTypes} from 'react';

import {Action} from './';

const Actions = ({actionClass, actions}) => {

  return (
    <ul className={`actions ${actionClass}`} >

      {
        actions.map((action, i) => {
          return <Action {...action} key={i} />;
        })
      }

    </ul>
  );
};

Actions.propTypes = {
  actionClass: PropTypes.string,
  actions: PropTypes.array
};

export default Actions;
