import React, {PropTypes} from 'react';
import {upperFirst, camelCase} from 'lodash';

import {Header} from '../components/';
import {ModelNotes} from '../components/mentor/model';

const renderModelView = component => {
  return React.createElement(component, {});
};

const Model = ({match}) => {

  const component = upperFirst(camelCase(match.params.id));

  return (
    <div className='page page-model '>
      <Header />

      {
        renderModelView(component)
      }

      <ModelNotes />

    </div>

  );
};

Model.propTypes = {
  match: PropTypes.object
};

export default Model;
