import React, {Component}  from 'react';
import {Link, Redirect} from 'react-router';

import {Header} from '../components/';
import {UserProfiles} from '../components/user';

import {login} from '../api/auth';
import {set} from '../auth/token';

import {isEmpty} from 'lodash';

class Login extends Component {

  state = {
    email: ``,
    password: ``,
    redirectToDashboard: false
  }

  componentDidMount() {
    this.$email.focus();
    this.$password.focus();
    this.$error.focus();
  }

  handleChange = () => {
    this.setState({
      email: this.$email.value,
      password: this.$password.value
    });
  }

  validate() {

    const {email, password} = this.state;

    let error = ``;

    if (!email || !password) {
      error = `Oops! Looks like your e-mail or password isn't correct.`;
    }

    return error;

  }

  submitHandler(e) {

    e.preventDefault();

    const error = this.validate();

    if (!isEmpty(error)) {

      this.setState({error, password: ``, email: ``});

    } else {

      login(this.state)
        .then(d => set(d))
        .then(() => {
          this.setState({redirectToDashboard: true});
        })
        .catch(err => {
          this.setState({error: err.error, password: ``, email: ``});
        });

    }

  }

  render() {

    const {email, password, error, redirectToDashboard} = this.state;

    return (

      <div className='page page-login'>

        {redirectToDashboard && (
          <Redirect to='/families' />
        )}

        <Header />

        <main>

          <UserProfiles />

          <form action='' method='post'
            acceptCharset='utf-8' onSubmit={e => this.submitHandler(e)}>

            <fieldset>

              <label>E-mail</label>
              <input
                type='text'
                name='email'
                placeholder='example@example.com'
                ref={el => this.$email = el}
                value={email}
                onChange={this.handleChange} />

              <label>Password</label>
              <input
                type='password'
                name='password'
                placeholder='your password'
                ref={el => this.$password = el}
                value={password}
                onChange={this.handleChange} />

              <div className='error' ref={el => this.$error = el}>{error}</div>

              <button type='submit' className='btn'>Log In</button>

            </fieldset>

          </form>

          <section className='info info-login'>
            <p>Don't have a profile on Tales@Home? <Link to='/register'>Register today!</Link> </p>
            <p><Link to='/'>Forgotten your password?</Link></p>
          </section>

        </main>

      </div>
    );
  }

}

export default Login;
