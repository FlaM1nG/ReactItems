import React, { Component } from 'react';
import MenuItem from './components/menuItem';
import Form from './components/form';
import '../css/menu.css';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import { createItem, deleteItem, updateItem, readItems } from './redux/actions/actions'
import uuid from 'uuid';
import axios from 'axios';

//main component that wraps major part of application
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { openAddForm: false, search: "" }
  }

  componentDidMount() {
    this.props.readItems();
  }

  //function to trigger form rendering
  handleAddClick = () => this.setState({ openAddForm: true });

  //function to handle item addition
  handleAddItem = ({ type, name, description }) => {

    if (type == "") type = "untitled";
    if (name == "") name = "untitled";
    if (description == "") description = "untitled";

    const newItem = {
      id: uuid.v4(),
      type,name, description
    }

    axios.post('/api/menuItems', { ...newItem }).then(({data : {name}}) => {
    }).catch(e => console.log("Addition failed , Error ", e));

    this.props.createItem(newItem);
    
    this.handleCancel();
  }

  //function to handle item deletion
  handleDeleteItem = (id) => {

    axios.delete(`/api/menuItems/${id}`).then(({data : {name}}) => {
    }).catch(e => console.log("Deletion failed, Error ",e));

    this.props.deleteItem(id)
  }


   //function to handle item updates
   handleUpdateItem = (item) => {

    axios.put(`/api/menuItems/${item.id}`,{item}).then( ({data : {name}}) => {
    }).catch(e => console.log('Updation failed, Error ',e));

    this.props.updateItem(item);
  }

  //function to unmount form component or in short close it
  handleCancel = () => this.setState({ openAddForm: false });

  onChange = e => {
      this.setState({search: e.target.value})
  }

  render() {
    const { loading, errors } = this.props;

      const filteredCountries = this.props.menuItems.filter(country =>{
          return country.type.toLowerCase().indexOf(this.state.search.toLowerCase()) !==-1
      } )

    return (
      <>
        {/* Heading */}
        <h1><i className="fas fa-list-alt"></i> Objects</h1>
        <input className="searchText" label="Search" placeholder="Search for type" onChange={this.onChange}></input>
        {/* Menu component starts */}
        <div className="menu" >

          <div className="heading menu-row">
            <div className="menu-item menu-item-type">Type</div>
            <div className="menu-item menu-item-name">Name</div>
            <div className="menu-item menu-item-description">Description</div>
            <div className="menu-item menu-item-operations"> States</div>
          </div>

          {
            this.state.loading ? (
              <div className="menu-row">
                <div className="msgEmpty">Loading Items...</div>
              </div>
            ) : this.state.errors ? (
              <div className="menu-row">
                <div className="err msgEmpty">Error in loading Items</div>
              </div>
               ) : (
                    <>

              {this.props.menuItems.length > 0 && filteredCountries.length > 0 ? filteredCountries.map((item, i) => {
                return <MenuItem key={item.type + "-" + item.name + "-" + item.description + "-" + item.id} id={item.id}
                  type={item.type} name={item.name} description={item.description}
                  handleDelete={this.handleDeleteItem}
                  handleUpdate={this.handleUpdateItem}
                  closeForm={this.handleCancel} />
              }) : (
                  <div className="menu-row">
                    <div className="msgEmpty">List is empty.</div>
                  </div>
                )}
                    </>
                  )
          }
        </div>
        {/* Menu component ends */}

        {!this.state.openAddForm ? (
          <span onClick={this.handleAddClick} className="addItem btnDefault"><i className="fas fa-plus"></i></span>
        ) : (
            <div className="menu"><Form addItem={this.handleAddItem} closeForm={this.handleCancel} /></div>
          )}
      </>
    )
  }
}

//subscribing to redux store updates
const mapStateToProps = ({ menuItems, loading, errors }) => ({
  menuItems, loading, errors
})

//connecting our main component to redux store
export default connect(mapStateToProps, { createItem, deleteItem, updateItem, readItems })(Menu);