import React from 'react';
import {inject, observer} from 'mobx-react';

import {ModelNote} from './';
import {FamilyInfoMembers} from '../family';

const ModelNotes = inject(`notes`, `families`)(observer(({notes, families}) => {

  const {handleSubmit} = notes;
  const {activeFamily} = families;

  return (
    <section className='model-notes'>
      <header>
        <h1>the {activeFamily.name}&#39;s</h1>
      </header>

      <FamilyInfoMembers />

      <ModelNote />

      <footer>
        <button onClick={handleSubmit}>stop <i className='fa fa-sign-out'></i></button>
        <button><i className='fa fa-download'></i></button>
      </footer>
    </section>
  );
}));

export default ModelNotes;
