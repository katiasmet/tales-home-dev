import React, {Component}  from 'react';
import {Link, Redirect} from 'react-router';

import {login} from '../../api/auth';
import {set, get} from '../../auth/token';
import {isLoggedIn} from '../../auth';

import {isEmpty} from 'lodash';

class UserLogin extends Component {

  state = {
    email: ``,
    password: ``,
    redirect: false
  }

  componentDidMount() {
    this.$email.focus();
    this.$password.focus();
    this.$error.focus();

    console.log(`mounting`);
    if (isLoggedIn(get)) {
      console.log(`true`);
      this.setState({redirect: true});
    }
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
          this.setState({redirect: true});
        })
        .catch(err => {
          this.setState({error: err.message, password: ``, email: ``});
        });

    }

  }

  render() {

    const {email, password, error, redirect} = this.state;

    return (

      <section className='login-form'>

        {
          redirect && (
            <Redirect to='/families' />
          )
        }

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

      </section>
    );
  }

}

export default UserLogin;
