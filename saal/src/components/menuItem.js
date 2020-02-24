import React, { Component } from 'react'
import Form from './form';
import MessageAlert from './alert'

//component that renders individual menu item stored in redux store
export default class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      name: "",
      description: null,
      openEditForm: false,
    }
  }

  //setting necessary values on mounting of component
  componentDidMount() {
    const { type, name, description } = this.props;
    this.setState({ type, name, description });
  }

  //function to trigger form view and close item view
  handleEditClick = () => this.setState({ openEditForm: true })

  //calls parent's function to updated item
  handleUpdate = ({type, name, description}) => {
    const updatedItem = {
      id : this.props.id, type, name, description
    } 
    this.props.handleUpdate(updatedItem);
    this.handleCancel();
  }

  //calls parent's function to delete item from store
  handleDelete = () => this.props.handleDelete(this.props.id);

  //function to close form
  handleCancel = () => this.setState({openEditForm : false});

  render() {
    return (
      <>
        {
          !this.state.openEditForm ? (
            <React.Fragment> 
            <div className="menu-row">
              <div className="menu-item menu-item-type">{this.state.type}</div>
              <div className="menu-item menu-item-name">{this.state.name}</div>
              <div className="menu-item menu-item-description">{this.state.description}</div>
              <div className="menu-item menu-item-operations">
                <span onClick={this.handleEditClick} className="btnDefault editItem"><i className="fas fa-pen"></i></span>
                <span onClick={this.handleDelete} className="btnDefault deleteItem"><i className="fas fa-trash"></i></span>
              </div>
            </div>
            <MessageAlert/>
            </React.Fragment>
          ) : (
       
            <Form type={this.state.type} name={this.state.name} description={this.state.description} 
            closeForm={this.handleCancel} updateItem={this.handleUpdate} />

          )
        
        }
      </>
    )
  }
}