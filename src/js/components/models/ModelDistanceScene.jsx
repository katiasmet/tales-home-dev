import React, {PropTypes} from 'react';
import {inject, observer} from 'mobx-react';

import {ModelDistanceCharacter} from './';
import {Flag} from '../illustrations';

const ModelDistanceScene = inject(`models`)(observer(({models}) => {
  const {draggableCharacters, currentLanguage, onboarding, familyLanguages} = models;

  const left = `${draggableCharacters[0].width / 2 + 20}rem`;
  const boardingHandPosition = {
    left
  };

  return (
    <section className='timeline-scene'>

      <div className='flag'>
        <Flag />
        <span className='flag-language'>
          {
            onboarding ? `English`
            : familyLanguages[currentLanguage]
          }
        </span>
      </div>

      {
        onboarding && <div className='onboarding-hand' style={boardingHandPosition}><i className='fa fa-hand-o-down'></i></div>
      }

      {

        onboarding ? (<ModelDistanceCharacter {...draggableCharacters[0]} />)
        : (
          draggableCharacters.slice().map((character, i) => {
            return <ModelDistanceCharacter {...character} key={i} />;
          })
        )

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
