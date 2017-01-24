import React from 'react';
import {Link} from 'react-router';

const Login = () => {
  return (
    <div className='page-login'>

      <header>
        <h1>Tales@Home</h1>
      </header>

      <main>
        <h2>Login</h2>
        <p>Don't have a profile on Tales@Home? <Link to='/register'>Register today!</Link> </p>
      </main>

  </div>
  );
};

export default Login;
