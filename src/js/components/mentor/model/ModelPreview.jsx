import React, {PropTypes} from 'react';
import {inject, observer} from 'mobx-react';

/* voor de preview: misschien een apart (variabel) component inladen ? <ModelPreviewNAAMMODEL />  */

const ModelPreview = inject(`models`)(observer(({models}) => {

  const {modelPreview} = models;
  const {name, description, themes} = modelPreview;

  return (
    <section className='model-preview'>
      <img src='./assets/img/model_distance_previewimg.png' alt='Distance Model Preview' height='375' width='480'></img>
      <h1>{name}</h1>
      <p>{description}</p>
      <ul className='model-preview-themes'>
        {
          themes.map((theme, i) => {
            return <li className='theme' key={i}>{theme}</li>;
          })
        }
      </ul>
    </section>
  );
}));

ModelPreview.propTypes = {
  models: PropTypes.shape({
    modelPreview: PropTypes.object
  })
};

export default ModelPreview;
