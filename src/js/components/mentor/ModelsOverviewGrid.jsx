import React, {PropTypes} from 'react';
import {inject, observer} from 'mobx-react';

import {ModelGridItem} from './model';

const ModelsOverviewGrid = inject(`models`)(observer(({models}) => {

  const {allModels, showGrid} = models;

  return (
    <section className={showGrid ? `models models-overview-grid show-grid` : `models models-overview-grid`}>
      <button className='btn btn-show-grid'
        onClick={handleShowGrid}
      >
      </button>

      {
        allModels.slice().map((model, i) => {
          return <ModelGridItem {...model} i={i} key={i} />;
        })
      }

    </section>
  );
}));

ModelsOverviewGrid.propTypes = {
  models: PropTypes.shape({
    allModels: PropTypes.array,
    showGrid: PropTypes.bool
  })
};

export default ModelsOverviewGrid;
