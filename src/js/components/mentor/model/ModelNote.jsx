import React from 'react';
import {inject, observer} from 'mobx-react';

import {FormInput} from '../../';

const ModelNote = inject(`notes`)(observer(({notes}) => {

  const {notesInput, handleNotes} = notes;

  return (
    <section className='model-note'>
      <FormInput
        id='notes-form'
        name='notes'
        label='Notes'
        value={notesInput}
        onChange={handleNotes}
        placeholder='Type to add notes of this session. Changes will be changed automatically.' />
    </section>
  );
}));

export default ModelNote;
