import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerName: '',
      registerEmail: '',
      registerPassword: '',
    };
  }

  onNameChange = (event) => {
    this.setState({registerName: event.target.value});
  }

  onEmailChange = (event) => {
    this.setState({registerEmail: event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({registerPassword: event.target.value});
  }

  onRegister = () => {
    fetch('https://powerful-crag-87955.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.registerName,
        email: this.state.registerEmail,
        password: this.state.registerPassword,
      }),
    })
      .then(response => response.json())
      .then(data => {
        const user = data[0];
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        } else {
          this.props.onRouteChange('register');
          console.log(data);
        }
      });
  }

  render() {
    return (
      <div className='br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5'>
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_in" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="text" 
                  name="name"  
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email">email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
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
              <input 
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                onClick={this.onRegister} 
                type="submit" 
                value="Register"
              />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Register;