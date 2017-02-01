import React  from 'react';

import {Header} from '../components';
import {UserProfiles, UserLogin, UserRegister} from '../components/user';
import {FamilyJoin} from '../components/family';

const renderLogin = () => {

  if (location.pathname === `/login`) {
    return <UserLogin />;
  } else if (location.pathname === `/register`) {
    return <UserRegister />;
  } else {
    return <FamilyJoin />;
  }

};

const Login = () => {

  return (

    <div className='page page-login'>

      <Header />

      <main className='page-login-forms'>

        <UserProfiles />

        {renderLogin()}

      </main>

    </div>
  );
};

export default Login;
