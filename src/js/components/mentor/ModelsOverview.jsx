import React from 'react';

import {ModelsNavigation} from './';
import {ModelPreview} from './model';

const ModelsOverview = () => {

  return (
    <section className='models models-overview'>
      <ModelPreview />
      <ModelsNavigation />
    </section>
  );
};

export default ModelsOverview;
