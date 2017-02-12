import React from 'react';
import {Redirect} from 'react-router-dom';
import {inject, observer} from 'mobx-react';

import {Loading} from '../../';
import {Laptop, Tablet} from '../../illustrations';

const StartSession = inject(`families`, `users`)(observer(({families, users}) => {

  const {activeFamily, sessionId, handleCloseSession} = families;
  const {isSessionStarted} = users;

  return (
    <section className='startsession pop-up-overlay pop-up'>
      <button className='btn' onClick={handleCloseSession}><i className='fa fa-close'></i></button>

      <div className='session-illustration'>
        <Laptop />
        <ul className='dots'>
          <li className='dot'></li>
          <li className='dot'></li>
          <li className='dot'></li>
          <li className='dot'></li>
          <li className='dot'></li>
        </ul>
        <Tablet />
      </div>

      <header>
        <h1>The {activeFamily.name}&#39;s session</h1>
      </header>


      <p className='session-code'>
        {sessionId}
      </p>

      {
        (!isSessionStarted) ? <Loading />
        : <Redirect to='/models' />
      }
    </section>

  );
}));

export default StartSession;
