import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {kebabCase} from 'lodash';

const handleNavItem = (model, i, handleModelPreview, modelPreview, handleStartModel, handleIsPassed) => {
  if (model._id === modelPreview._id) {

    const pathname = kebabCase(model.name);

    return (
      <li className='model-nav-item active' key={i} onClick={() => handleStartModel(model._id)}>
        <Link to={`/models/${pathname}`}>
          <i className='fa fa-play'></i>
        </Link>
      </li>
    );

  } else {

    return (
      <li className={handleIsPassed(model._id) ? `model-nav-item done` : `model-nav-item`}
          key={i}
          onClick={() => handleModelPreview(model._id)}>
        {model.name}
      </li>
    );

  }
};

const ModelsNavigation = inject(`models`, `families`)(observer(({models, families}) => {

  const {allModels, handleIsPassed, handleModelPreview, modelPreview} = models;
  const {handleStartModel} = families;

  return (
    <nav>
      <ul className='models-navigation'>
        {
          allModels.slice().map((model, i) => {
            return handleNavItem(model, i, handleModelPreview, modelPreview, handleStartModel, handleIsPassed);
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
    modelPreview: PropTypes.object,
    handleIsPassed: PropTypes.func
  }),
  families: PropTypes.shape({
    handleStartModel: PropTypes.func
  })
};

export default ModelsNavigation;
