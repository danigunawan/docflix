import React from 'react';
import { Link, withRouter } from 'react-router';

class SessionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    this.redirectIfLoggedIn();
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location.pathname !== newProps.location.pathname) {
      this.props.clearErrors();
    }
  }

  redirectIfLoggedIn() {
    if (this.props.loggedIn) {
      this.props.router.push("/");
    }
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state;
    this.props.processForm(user);
  }

  handleGuestLogin() {
    const user = {email: 'guest@docflix.tech', password: 'testing'};
    this.props.processForm(user);
  }

  guestLogin() {
    if (this.props.formType === 'login') {
      return (
        <div className='below-form-item'>
          <a onClick={this.handleGuestLogin.bind(this)} className='guest-login'>
            <i className="fa fa-user" aria-hidden="true"></i>
            <p>Login with guest account</p>
          </a>
        </div>
      );
    }
  }

  navLink() {
    if (this.props.formType === 'login') {
      return <Link to='/signup' className='form-bottom-link'>Sign up now.</Link>;
    } else {
      return <Link to='/login' className='form-bottom-link'>Sign in to Docflix.</Link>;
    }
  }

  navText() {
    if (this.props.formType === 'login') {
      return 'New to Docflix?';
    } else {
      return 'Already have an account?';
    }
  }

  headerText() {
    if (this.props.formType === 'login') {
      return 'Sign In';
    } else {
      return 'Sign Up';
    }
  }

  submitButtonText() {
    if (this.props.formType === 'login') {
      return 'Sign In';
    } else {
      return 'Register';
    }
  }



  _fName() {
    if (this.props.formType === 'signup') {
      return(
        <div>
          <label>First Name</label>
            <input type='text'
                   value={this.state.fname}
                   onChange={this.update('fname')}
                   className='login-input'/>
          <br/>
        </div>
      );
    }
  }
  _lName() {
    if (this.props.formType === 'signup') {
      return(
        <div>
          <label>Last Name</label>
            <input type='text'
                   value={this.state.lname}
                   onChange={this.update('lname')}
                   className='login-input'/>
          <br/>
        </div>
      );
    }
  }

  errorHandler() {
    return(
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  renderErrors() {

  }


  render() {
    return (
      <div className='login-form-container'>
        <form onSubmit={this.handleSubmit} className='login-form-box'>
          <div className='login-form'>
            <h3 className="login-header-text">{this.headerText()}</h3>
            <div className='auth-errors'>{this.errorHandler()}</div>
            <div className='login-labels'>
              <label htmlFor='email'>Email  </label>
              <input id='email'
                     type='text'
                     value={this.state.email}
                     onChange={this.update('email')}
                     className='login-input'/>
              <label htmlFor='password'>Password</label>
                <input id='password'
                       type='password'
                       value={this.state.password}
                       onChange={this.update('password')}
                       className='login-input'/>
              { this._fName() }
              { this._lName() }
            </div>
            <input type='submit' value={this.submitButtonText()} className='auth-form-submit-btn'></input>
          </div>
          {this.guestLogin()}
          <div className='form-text'>
            {this.navText()} {this.navLink()}
          </div>
        </form>
      </div>
    );
  }
}


export default withRouter(SessionForm);
