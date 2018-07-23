import React from 'react';

class Signin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
    };
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value});
  }

  onSubmitSignIn = () => {
    fetch('https://powerful-crag-87955.herokuapp.com/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then(response => response.json())
      .then(data => {
        const user = data[0];
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        } else {
          this.props.onRouteChange('signin');
          console.log(data);
        }
      });
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <div className='br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5'>
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_in" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="email" 
                  name="email" 
                  id="email" 
                  onChange={this.onEmailChange}
                />
              </div>

              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="password" 
                  name="password"  
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>

            <div className="">
              <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                onClick={this.onSubmitSignIn}
                type="submit" 
                value="Sign in"
              />
            </div>
            
            <div className="lh-copy mt3">
              <p 
                onClick={() => onRouteChange('register')}
                className="f6 link dim black db pointer"
              >Register</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
 
}

export default Signin;