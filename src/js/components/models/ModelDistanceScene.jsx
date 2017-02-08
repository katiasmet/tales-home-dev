import React, {PropTypes} from 'react';
import {inject, observer} from 'mobx-react';

import {ModelDistanceCharacter} from './';
import {Flag} from '../illustrations';

const ModelDistanceScene = inject(`models`)(observer(({models}) => {
  const {familyLanguages, currentLanguage, draggableCharacters} = models;

  return (
    <section className='timeline-scene'>

      <div className='flag'>
        <Flag />
        <span className='flag-language'>{familyLanguages[currentLanguage]}</span>
      </div>

      {
        draggableCharacters.slice().map((character, i) => {
          return <ModelDistanceCharacter {...character} key={i} />;
        })
      }

    </section>
  );
}));

ModelDistanceScene.propTypes = {
  models: PropTypes.shape({
    familyLanguages: PropTypes.array,
    currentLanguage: PropTypes.number,
    draggableCharacters: PropTypes.array,
    handleMoveCharacter: PropTypes.func
  }),
};

export default ModelDistanceScene;
