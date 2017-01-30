import React, {PropTypes} from 'react';

import {Header} from '../components/';
import {ModelNotes} from '../compontents/mentor/model';

const Model = ({params}) => {

  const {id} = params;

  return (
    <div className='page page-model '>
      <Header />

      <p>{id}</p>

      <ModelNotes />

    </div>

  );
};

Model.propTypes = {
  params: PropTypes.object
};

export default Model;
