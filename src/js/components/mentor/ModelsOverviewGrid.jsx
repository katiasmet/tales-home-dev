import React, {PropTypes} from 'react';
import {inject, observer} from 'mobx-react';

import {ModelGridItem} from './model';

const ModelsOverviewGrid = inject(`models`, `families`)(observer(({models, families}) => {

  const {allModels, showGrid, handleShowGrid, handleIsPassed} = models;
  const {handleStartModel} = families;

  return (
    <section className={showGrid ? `models models-overview-grid-section show-grid` : `models models-overview-grid-section`}>
      <button className='btn btn-show-grid'
        onClick={handleShowGrid}
      >
      </button>

      <section className='models-overview-grid'>
        {
          allModels.slice().map((model, i) => {
            return <ModelGridItem {...model} i={i} key={i} handleStartSession={handleStartModel} handleIsPassed={handleIsPassed} />;
          })
        }
      </section>
    </section>
  );
}));

ModelsOverviewGrid.propTypes = {
  models: PropTypes.shape({
    handleIsPassed: PropTypes.func,
    allModels: PropTypes.array,
    showGrid: PropTypes.bool
  }),
  families: PropTypes.shape({
    handleStartModel: PropTypes.func
  })
};

export default ModelsOverviewGrid;
