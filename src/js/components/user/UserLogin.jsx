import React, {Component, PropTypes}  from 'react';
import {Link, Redirect} from 'react-router';
import {observer, inject} from 'mobx-react';

import {login} from '../../api/auth';
import {set} from '../../auth/token';

import {isEmpty} from 'lodash';

@inject(`user`) @observer
class UserLogin extends Component {

  componentDidMount() {
    this.$email.focus();
    this.$password.focus();
    this.$error.focus();
  }

  handleChange = () => {

    this.props.user.update(`userLogin`, `email`, this.$email.value);
    this.props.user.update(`userLogin`, `password`, this.$password.value);

  }

  validate() {

    const {email, password} = this.props.user.userLogin;

    let error = ``;

    if (!email || !password) {
      error = `Oops! Looks like your e-mail or password isn't correct.`;
    }

    return error;

  }

  clearForm(error) {
    this.props.user.update(`userLogin`, `email`, ``);
    this.props.user.update(`userLogin`, `password`, ``);
    this.props.user.update(`userLogin`, `error`, error);
  }

  submitHandler(e) {

    e.preventDefault();

    const error = this.validate();

    if (!isEmpty(error)) {

      this.clearForm(error);

    } else {

      const {email, password} = this.props.user.userLogin;

      login({email: email, password: password})
        .then(d => set(d))
        .then(() => {
          this.props.user.update(`userLogin`, `redirect`, true);
        })
        .catch(error => {
          this.clearForm(error.message);
        });

    }

  }

  render() {

    const {email, password, error, redirect} = this.props.user.userLogin;

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

UserLogin.propTypes = {
  user: PropTypes.element
};

export default UserLogin;
