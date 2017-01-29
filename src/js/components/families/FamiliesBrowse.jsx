import React, {PropTypes} from 'react';

import {observer, inject} from 'mobx-react';
import {toArray, isEmpty, includes} from 'lodash';

const handleCharacterClass = (character, characters, activeCharacter) => {

  if (includes(characters, character)) {
    if (activeCharacter === character) return `active`;
    return ``;
  } else {
    return `disabled`;
  }

};

const renderCharacter = (activeCharacter, characters, handleActiveCharacter) => {

  const alphabet = toArray(`ABCDEFGHIJKLMNOPQRSTUVWXYZ`);

  return alphabet.map((character, i) => {

    const characterClass = handleCharacterClass(character, characters, activeCharacter);

    return (
      <li key={i}
          className={characterClass}
          onClick={isEmpty(characterClass) && handleActiveCharacter}>
          {character}
      </li>
    );
  });
};

const FamiliesBrowse = inject(`families`)(observer(({families}) => {

  const {activeCharacter, characters, handleActiveCharacter} = families;

  return (
    <ul className='families families-browse'>
      {
        renderCharacter(activeCharacter, characters, handleActiveCharacter)
      }
    </ul>
  );
}));

/*characters.map((letter, i) => {
  return (
    <li key={i}
        className={(letter === activeCharacter) ? `active` : ``}
        onClick={handleActiveCharacter}>
          {letter}
    </li>
  );
})*/

FamiliesBrowse.propTypes = {
  families: PropTypes.shape({
    activeCharacter: PropTypes.string,
    characters: PropTypes.array,
    handleActiveCharacter: PropTypes.func
  })
};

export default FamiliesBrowse;
