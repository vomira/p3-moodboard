import React, { Component } from 'react';
import WebCam from 'react-webcam';
import { Button, Container } from 'shards-react';


export default class Webcam extends Component {
  constructor(props) {
    super(props);
    this.webcamRef = React.createRef();
    this.state = {
      idImage: null
    }
  }

  handleNewScreenshot = () => {
    this.setState({
      idImage: null
    })
  }

  handleCapture = () => {
    const screenshot = this.webcamRef.current.getScreenshot();
    this.setState({idImage: screenshot})
    this.props.setUserImage(screenshot);
  }

  render() {
    return (
      this.state.idImage ? 
          <Container>
          <img className='img-fluid' src={this.state.idImage}/>
        <Button
          theme='secondary'
          onClick={this.handleNewScreenshot}
        >Try Again</Button>
         </Container>
        :
        <Container>
       <WebCam audio={false} ref={this.webcamRef} screenshotFormat='image/png'/>
        <Button
          theme='secondary'
          onClick={this.handleCapture}
        >Take a picture</Button>
         </Container>
        
    )
  }
}
