import React, { Component } from 'react';
import Particles from 'react-particles-js';

import Navigation from '../../components/Navigation/Navigation';
import Signin from '../Signin/Signin';
import Register from '../Register/Register';
import Logo from '../../components/Logo/Logo';
import Rank from '../../components/Rank/Rank';
import ImageLinkForm from '../../components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../../components/FaceRecognition/FaceRecognition';

import './App.css';



const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    const { id, name, email, entries, joined } = data;

    this.setState({
      user: {
        id: id,
        name: name,
        email: email,
        entries: entries,
        joined: joined,
      },        
    });
  }

 

  calculateFaceLocation = (data) => {
    const {regions} = data.outputs[0].data;
    var boxArray = [];

    if(regions) {
      boxArray = regions.map(region => {
        const clarifaiBox = region.region_info.bounding_box;
        const image = document.getElementById('input-image');
        const width = Number(image.width);
        const height = Number(image.height);

        return {
          leftCol: clarifaiBox.left_col * width,
          topRow: clarifaiBox.top_row * height,
          rightCol: (1 - clarifaiBox.right_col) * width,
          bottomRow: (1 - clarifaiBox.bottom_row) * height,
        };
      });
    }
    return boxArray;
  }

  displayFaceBox = (boxArray) => {
    this.setState({boxes: boxArray});
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch('https://powerful-crag-87955.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
    .then(response => response.json())
    .then(response => {
      const face_boxes = this.calculateFaceLocation(response);
      this.displayFaceBox(face_boxes);

      fetch('https://powerful-crag-87955.herokuapp.com/image', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: this.state.user.id,
          nFaces: this.state.boxes.length,
        }),
      })
      .then(response => response.json())
      .then(data => {
        this.loadUser(data[0]);
      })
      .catch(console.log);
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({isSignedIn: true});
    } else {
      this.setState(initialState);
    }
    this.setState({ route: route });
  }

  render() {
    const { boxes, imageUrl, route, isSignedIn } = this.state;
    const jsx_buffer = [];

    jsx_buffer.push(
      <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} key={'nav'}/>
    );
    jsx_buffer.push(
      <Particles className={'particles'} params={particlesOptions} key={'particles'}/>
    );

    switch(route) {
      case 'home':
        jsx_buffer.push(
          <div key={'main-div'}>
            <Logo key={'logo'}/>
            <Rank name={this.state.user.name} entries={this.state.user.entries} key={'rank'} />
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onPictureSubmit} key={'im-form'}/>
            <FaceRecognition faceBoxes={ boxes } imageUrl={ imageUrl } key={'img'} />
          </div>
        );
        break;
      case 'register':
        jsx_buffer.push(
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} key={'reg-form'} />
        );
        break;
      case 'signin':
        jsx_buffer.push(
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} key={'signin-form'} />
        );
        break;
      default:
        break;
    }

    return (
      <div className='App'>
        {jsx_buffer}
      </div>
    );
  }
}

export default App;
