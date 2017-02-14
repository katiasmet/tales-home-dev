import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {kebabCase} from 'lodash';

const handleNavItem = (model, i, handleModelPreview, modelPreview, handleStartModel, handleIsPassed) => {
  const isPassed = handleIsPassed(model._id);

  if (model._id === modelPreview._id) {

    const pathname = kebabCase(model.name);

    return (
      <li className={isPassed ? `model-nav-item active done` : `model-nav-item active done`}
          key={i}
          onClick={() => handleStartModel(model._id)}>
        <Link to={`/models/${pathname}`}>
          <i className='fa fa-play'></i>
        </Link>
        {isPassed && <i className='fa fa-check'></i>}
      </li>
    );

  } else {

    return (
      <li className={isPassed ? `model-nav-item done` : `model-nav-item`}
          key={i}
          onClick={() => handleModelPreview(model._id)}>
          {isPassed && <i className='fa fa-check'></i>}
          <span className='model-name'>{model.name}</span>
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
