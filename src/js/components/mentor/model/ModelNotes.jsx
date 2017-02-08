import React from 'react';
import {inject, observer} from 'mobx-react';

import {ModelNote, ModelMembers} from './';

const ModelNotes = inject(`notes`, `families`)(observer(({notes, families}) => {

  const {handleSubmit, handleCloseNotes} = notes;
  const {activeFamily} = families;

  return (
    <section className='model-notes'>

      <section className='model-info'>
        <header>
          <h1>the {activeFamily.name}&#39;s</h1>
          <button className='btn btn-close' onClick={handleCloseNotes}><i className='fa fa-close'></i></button>
        </header>

        <ModelMembers />
        <ModelNote />
      </section>

      <footer>
        <button onClick={handleSubmit} className='btn btn-stop'>stop <i className='fa fa-sign-out'></i></button>
        <button className='btn'><i className='fa fa-download'></i></button>
      </footer>
    </section>
  );
}));

export default ModelNotes;
