import React, { Component } from 'react';
import Webcam from './Webcam';
import {Button} from 'shards-react';
import axios from 'axios';


export default class TestFaceId extends Component {

  state = {
    username: 'mira8',
    profileImg: ''
  }

  setUserImage = (img) => {
    this.setState({ profileImg: img });
  };

  handleDetect = () => {
    axios.post('/auth/facialSignUp', {
      username: this.state.username,
      profileImg: this.state.profileImg
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
  }
  

  render() {
    return (
      <div>
        <Webcam setUserImage={this.setUserImage} />
        <Button onClick={this.handleDetect}>Detect Face</Button>
      </div>
    )
  }
}


