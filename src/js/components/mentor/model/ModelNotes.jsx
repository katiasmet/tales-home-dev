import React from 'react';
import {inject, observer} from 'mobx-react';

import {ModelNote} from './';
import {FamilyInfoMembers} from '../family';

const ModelNotes = inject(`notes`)(observer(({notes}) => {

  const {handleSubmit} = notes;

  return (
    <section className='model-notes'>
      <header>
        <h>the abdils</h>
      </header>

      <FamilyInfoMembers />

      <ModelNote />

      <footer>
        <button onClick={handleSubmit}>stop</button>
        <button>download</button>
      </footer>
    </section>
  );
}));

export default ModelNotes;
