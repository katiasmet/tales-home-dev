import React, {PropTypes} from 'react';
import {upperFirst, camelCase} from 'lodash';

import {Header} from '../components/';
import {ModelNotes} from '../components/mentor/model';

const renderModelView = component => {
  return React.createElement(component, {});
};

const Model = ({match}) => {

  console.log(match);

  //const {id} = match.params.id;
  const component = upperFirst(camelCase(match.params.id));

  return (
    <div className='page page-model '>
      <Header />

      <p>{match.params.idd}</p>

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
