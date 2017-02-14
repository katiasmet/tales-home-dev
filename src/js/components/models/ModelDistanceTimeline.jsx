import React from 'react';
import {inject, observer} from 'mobx-react';

import {ModelDistanceTimelineCharacter} from './';

const ModelDistanceTimeline = inject(`models`)(observer(({models}) => {

  const {currentLanguage, onboarding, familyLanguages, draggableCharacters} = models;

  return (
    <ul className='timeline'>
      <li className='timeline-language'>
        {
          onboarding ? `English`
          : familyLanguages[currentLanguage]
        }
      </li>

      {

        onboarding ? (<ModelDistanceTimelineCharacter {...draggableCharacters[0]} onboarding={onboarding} />)
        : (
          draggableCharacters.slice().map((character, i) => {
            return <ModelDistanceTimelineCharacter key={i} {...character} onboarding={onboarding} />;
          })
        )

      }

    </ul>
  );
}));

export default ModelDistanceTimeline;
