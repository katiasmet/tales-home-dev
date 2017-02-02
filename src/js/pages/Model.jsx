import React, {PropTypes} from 'react';
import {upperFirst, camelCase} from 'lodash';

import {Header} from '../components/';
import {ModelNotes} from '../components/mentor/model';

const Model = ({match, location}) => {

  const {pathname} = location;
  const component = upperFirst(camelCase(match.params.id));

  return (
    <div className='page page-model '>
      <Header pathname={pathname} />

      {
        renderModelView(component)
      }

      <ModelNotes />

    </div>

  );
};

const renderModelView = component => {
  return React.createElement(component, {});
};

Model.propTypes = {
  match: PropTypes.object,
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

export default Model;
