import React, { Component } from 'react'
import { Alert  } from 'reactstrap'

//Alert component
export default class MessageAlert extends Component {
  state = {
      visible: false,
      color: "success"
  }

  toggle() {
      this.setState({
          visible: !this.state.visible
      });
  }
  render() {
    return (
       <Alert color={this.state.color} isOpen={this.state.visible} toggle={this.toggle.bind(this)}>inserted succesfull</Alert>
    )
  }
}