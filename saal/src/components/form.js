import React, { Component } from 'react'
import MessageAlert from './alert'

//Form component which is used as EDIT_ITEM_FORM as well as CREATE_ITEM_FORM
export default class Form extends Component {
  constructor(props) {
    super(props);

    //initializing state 
    this.state = {
      type: !this.props.type ? "" : this.props.type, 
      name: !this.props.name ? "" : this.props.name, 
      description: !this.props.description ? "" : this.props.description
    };
  }

  //funtion that updates state on input change
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  //function that sends the final data when user presses Submit
  handleSubmit = () => {
    const { type, name, description } = this.state;
    if(this.props.type && this.props.name && this.props.description){
      this.props.updateItem({ type, name, description });
    }
    else{
      this.props.addItem({ type, name, description });
    }
  }

  //calls parent function to close form
  handleCancel = () => this.props.closeForm();

  render() {
    return (
      <form className="menu-row" >
        <div className="menu-item menu-item-type">
          <input value={this.state.type} onChange={this.handleChange}
            name="type" placeholder="Type" type="text" />
        </div>
        <div className="menu-item menu-item-name">
          <input value={this.state.name} onChange={this.handleChange}
            name="name" placeholder="Name" type="text" />
        </div>
        <div className="menu-item menu-item-description">
          <input value={this.state.description} onChange={this.handleChange}
            name="description" placeholder="Description" type="text" />
        </div>
        <div className="menu-item menu-item-operations">
          <span onClick={this.handleSubmit} className="btnDefault doneItem">
            <i className="fas fa-check" />
          </span>
          <span onClick={this.handleCancel} className="btnDefault cancelItem">
            <i className="fas fa-times" />
          </span>
        </div>
      </form>
    )
  }
}