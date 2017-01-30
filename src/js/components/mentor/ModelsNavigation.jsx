import React, {PropTypes} from 'react';
import {inject, observer} from 'mobx-react';

const handleNavItem = (model, i, handleModelPreview, modelPreview) => {
  if (model._id === modelPreview._id) {
    return (
      <li className='model-nav-item active' key={i}>
        <i className='fa fa-play'></i>
      </li>
    );
  } else {
    return (
      <li className={model.passed ? `model-nav-item done` : `model-nav-item`}
          key={i}
          onClick={() => handleModelPreview(model._id)}>
        {model.name}
      </li>
    );
  }
};

const ModelsNavigation = inject(`models`)(observer(({models}) => {

  /* TODO check familymodels for active family,
  kun je al even testen via stores > models > handlePassedModels op true te zetten */

  const {allModels, handleModelPreview, modelPreview} = models;

  return (
    <nav>
      <ul className='models-navigation'>
        {
          allModels.slice().map((model, i) => {
            return handleNavItem(model, i, handleModelPreview, modelPreview);
          })
        }
      </ul>
    </nav>
  );
}));

ModelsNavigation.propTypes = {
  models: PropTypes.shape({
    allModels: PropTypes.array,
    handleModelPreview: PropTypes.func,
    modelPreview: PropTypes.object
  })
};

export default ModelsNavigation;
