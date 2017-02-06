import React, {PropTypes} from 'react';

import {Header} from '../components';
import {UserProfiles, UserLogin, UserRegister} from '../components/user';
import {FamilyJoin} from '../components/family';

const Login = ({location}) => {

  const {pathname} = location;
  const pageClass = renderLoginClass();

  return (

    <div className={`page page-login ${pageClass}`}>

      <Header pathname={pathname} />

      <main>
        <section className='page-login-forms'>
          <UserProfiles pathname={pathname} />
          {renderLogin()}
        </section>

      </main>

    </div>
  );
};

const renderLoginClass = () => {
  if (location.pathname === `/login`) {
    return `login`;
  } else if (location.pathname === `/register`) {
    return `register`;
  } else {
    return `join`;
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
