import React, {PropTypes} from 'react';

import {Header} from '../components';
import {UserProfiles, UserLogin, UserRegister} from '../components/user';
import {FamilyJoin} from '../components/family';

const Login = ({location}) => {

  const {pathname} = location;

  return (

    <div className='page page-login'>

      <Header pathname={pathname} />

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

Login.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

export default Login;
