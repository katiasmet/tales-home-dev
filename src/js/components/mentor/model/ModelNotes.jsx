import React from 'react';
import {inject, observer} from 'mobx-react';

import {ModelNote, ModelMembers} from './';
import {ProfessorOverlay} from '../../illustrations';

const ModelNotes = inject(`notes`, `families`)(observer(({notes, families}) => {

  const {handleSubmit, handleCloseNotes} = notes;
  const {activeFamily, handleConfirmation, confirmation} = families;

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

      {
        (confirmation === `close model`) ? renderConfirmation(handleSubmit, handleConfirmation)
        : renderActions(handleConfirmation)
      }

    </section>
  );
}));

const renderConfirmation = (handleSubmit, handleConfirmation) => {

  return (
    <footer className='footer confirmation-overlay'>
      <figure className='character'>
        <ProfessorOverlay />
      </figure>
      <div className='actions'>
        <button type='submit' onClick={handleSubmit} className='btn btn-green'><i className='fa fa-check'></i></button>
        <button type='button' onClick={() => handleConfirmation(`close model`)} className='btn btn-red'><i className='fa fa-close'></i></button>
      </div>
    </footer>
  );
};

const renderActions = handleConfirmation => {

  console.log(`render actions`);

  return (
    <footer className='footer'>
      <button type='button' onClick={() => handleConfirmation(`close model`)} className='btn btn-stop'>stop <i className='fa fa-sign-out'></i></button>
      <button type='button' className='btn'><i className='fa fa-download'></i></button>
    </footer>
  );
};

export default ModelNotes;
