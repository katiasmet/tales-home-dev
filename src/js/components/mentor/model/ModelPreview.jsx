import React, {PropTypes} from 'react';
import {inject, observer} from 'mobx-react';

import {ModelDistanceBg, Flag} from '../../illustrations';

const ModelPreview = inject(`models`)(observer(({models}) => {

  const {modelPreview} = models;
  const {name, description, image, themes} = modelPreview;

  return (
    <section className='model-preview'>

      {
        renderPreviewBackground(image)
      }

      <div className='model-preview-info'>
        <h1>{name}</h1>
        <p>{description}</p>
        <ul className='model-preview-themes'>
          {
            themes.map((theme, i) => {
              return <li className='theme' key={i}>{theme}</li>;
            })
          }
        </ul>
      </div>

    </section>
  );
}));

const renderPreviewBackground = image => {
  console.log(image);
  switch (image) {
  case `model-distance`:
    return (
        <section className='preview-background'>
          <ModelDistanceBg />
          <div className='flag'>
            <Flag />
          </div>
        </section>
    );
  case `model-discussion`:
    return (
        <img src='./assets/img/model_distance_previewimg.png' alt='Distance Model Preview' ></img>
    );
  case `model-learning`:
    return (
        <img src='./assets/img/model_distance_previewimg.png' alt='Distance Model Preview' ></img>
    );
  }
};

ModelPreview.propTypes = {
  models: PropTypes.shape({
    modelPreview: PropTypes.object
  })
};

export default ModelPreview;
