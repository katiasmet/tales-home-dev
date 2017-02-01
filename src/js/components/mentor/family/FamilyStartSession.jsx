import React from 'react';
import {inject, observer} from 'mobx-react';

const StartSession = inject(`families`)(observer(({families}) => {

  const {activeFamily, sessionId} = families;

  return (
    <section className='startsession pop-up'>
      <header>
        <h1>The {activeFamily.name}&#39;s</h1>

        <button className='btn'><i className='fa fa-close'></i></button>
      </header>


      <p className='session-code'>
        {sessionId}
      </p>


    </section>

  );
}));

export default StartSession;
