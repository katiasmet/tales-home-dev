import React, {PropTypes} from 'react';
import {upperFirst, camelCase} from 'lodash';

import {Header} from '../components/';
import {ModelNotes} from '../components/mentor/model';

const renderModelView = component => {
  return React.createElement(component, {});
};

const Model = ({params}) => {

  const {id} = params;
  const component = upperFirst(camelCase(id));

  return (
    <div className='page page-model '>
      <Header />

      <p>{id}</p>

      {
        renderModelView(component)
      }


      <ModelNotes />

    </div>

  );
};

Model.propTypes = {
  params: PropTypes.object
};

export default Model;
