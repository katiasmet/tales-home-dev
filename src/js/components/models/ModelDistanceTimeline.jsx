import React from 'react';
import {inject, observer} from 'mobx-react';

import {ModelDistanceTimelineCharacter} from './';

const ModelDistanceTimeline = inject(`models`)(observer(({models}) => {

  const {currentLanguage, onboarding} = models;
  let {familyLanguages, draggableCharacters} = models;
  if (onboarding) {
    familyLanguages = [`English`];
    draggableCharacters = [draggableCharacters[0]];
  }

  return (
    <ul className='timeline'>
      <li className='timeline-language'>{familyLanguages[currentLanguage]}</li>
      {
        draggableCharacters.slice().map((character, i) => {
          return <ModelDistanceTimelineCharacter key={i} {...character} onboarding={onboarding} />;
        })
      }
    </ul>
  );
}));

export default ModelDistanceTimeline;
