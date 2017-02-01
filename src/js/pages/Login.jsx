import React  from 'react';

import {Header} from '../components';
import {UserProfiles, UserLogin, UserRegister} from '../components/user';
import {FamilyJoin} from '../components/family';

const renderProfileImages = () => {

  if (location.pathname === `/login`) {
    return <img src='assets/img/UserProfiles_professional.png' alt='Smiley face' height='151' width='162' className='page-login-img' />;
  } else if (location.pathname === `/register`) {
    return <img src='assets/img/UserProfiles_newprofessional.png' alt='Smiley face' height='151' width='162' className='page-login-img' />;
  } else {
    return <img src='assets/img/UserProfiles_family.png' alt='Smiley face' height='151' width='162' className='page-login-img' />;
  }

};

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

      <main>
        <section className='page-login-forms'>
          {renderProfileImages()}
          <UserProfiles />

          {renderLogin()}
        </section>

      </main>

    </div>
  );
};

export default Login;
