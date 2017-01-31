import React from 'react';

import {ModelNote} from './';
import {FamilyInfoMembers} from '../family';

const ModelNotes = () => {
  return (
    <section className='model-notes'>
      <header>
        <h>the abdils</h>
      </header>

      <FamilyInfoMembers />

      <ModelNote />

      <footer>
        <button>stop</button>
        <button>download</button>
      </footer>
    </section>
  );
};

export default ModelNotes;
