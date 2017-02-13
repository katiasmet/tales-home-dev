import React, {PropTypes} from 'react';
import {inject, observer} from 'mobx-react';

import {ModelDistanceCharacter} from './';
import {Flag} from '../illustrations';

const ModelDistanceScene = inject(`models`)(observer(({models}) => {
  const {currentLanguage, draggableCharacters, onboarding} = models;
  let {familyLanguages} = models;

  if (onboarding) familyLanguages = [`English`];

  return (
    <section className='timeline-scene'>

      <div className='flag'>
        <Flag />
        <span className='flag-language'>{familyLanguages[currentLanguage]}</span>
      </div>

      {
        onboarding && <div className='onboarding-hand'><i className='fa fa-hand-o-down'></i></div>
      }

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
    handleMoveCharacter: PropTypes.func,
    onboarding: PropTypes.bool
  }),
};

export default ModelDistanceScene;
