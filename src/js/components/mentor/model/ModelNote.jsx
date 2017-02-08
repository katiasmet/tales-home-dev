import React from 'react';
import {inject, observer} from 'mobx-react';
import {isEmpty} from 'lodash';

const ModelNote = inject(`notes`)(observer(({notes}) => {

  const {notesInput, handleNotes, error} = notes;

  return (
    <section className='model-note'>

      <span className='form-input'>

        <label htmlFor='notes-form'>Notes</label>

        <span className='form-textarea'>
          <textarea
            id='notes-form'
            name='notes'
            value={notesInput}
            placeholder='Type to add notes for this model. Changes will be saved automatically.'
            onChange={handleNotes}
          >
         </textarea>
        </span>

      </span>

      {!isEmpty(error) && <div className='error'>{error}</div>}

    </section>
  );
}));

export default ModelNote;
