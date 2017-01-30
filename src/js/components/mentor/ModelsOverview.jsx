import React from 'react';

import {ModelsNavigation} from './';
import {ModelPreview} from './model';

const ModelsOverview = () => {

  return (
    <section className='models models-overview'>
      <ModelsNavigation />
      <ModelPreview />
    </section>
  );
};

export default ModelsOverview;
