import React from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import {postCard, postImg} from '../server'
import {Link} from 'react-router';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import Navbar from './nav';

const styles = {
  button: {
    marginBottom: 12,
    textTransform: 'lowercase',
    width: '100%',
  },
  imageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

  export default class Post extends React.Component {
    constructor(props) {
      super(props);
      this.handleDropChange = this.handleDropChange.bind(this);
      this.handleImgChange = this.handleImgChange.bind(this);
      this.handleAddressChange = this.handleAddressChange.bind(this);
      this.handleRoomChange = this.handleRoomChange.bind(this);
      this.handleRentChange = this.handleRentChange.bind(this);
      this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleNumberChange = this.handleNumberChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      var date = new Date();
      var dd = date.getDate();
      var mm = date.getMonth()+1;
      var yyyy = date.getFullYear();
      this.state = {
        address: "",
        postdate: mm+'/'+dd+'/'+yyyy,
        title: "",
        price: "",
        img: "",
        body: "",
        season: 1,
        contactInfo: [
          {
            name: "",
            phone: "",
            email: "",
          }
          ]
      };
    }

      getChildContext() {
          return { muiTheme: getMuiTheme(baseTheme) };
      }

      handleAddressChange(event){
        this.setState({
          address: event.target.value,
        });
      };

      handleRoomChange(event){
        this.setState({
          title: event.target.value,
        });
      };

      handleRentChange(event){
        this.setState({
          price: event.target.value,
        });
      };

      handleImgChange(event){ 
        this.setState({
          img: event.target.files[0].name,
        });
        console.log(event.target.files[0]);
        postImg(event.target.files[0]);
      };

      handleDescriptionChange(event){
        this.setState({
          body: event.target.value,
        });
      };

      handleNameChange(event){
        var contact = this.state.contactInfo;
        contact[0].name = event.target.value;
        this.setState({
          contactInfo: contact,
        });
      };


      handleNumberChange(event){
        var contact = this.state.contactInfo;
        contact[0].phone = event.target.value;
        this.setState({
          contactInfo: contact,
        });
      };

      handleEmailChange(event){
        var contact = this.state.contactInfo;
        contact[0].email = event.target.value;
        this.setState({
          contactInfo: contact,
        });
      };


      handlePost(event){
        event.preventDefault();
        postCard(this.state);
        window.location = 'http://localhost:3000/#/front/';
      }

      handleDropChange(event, index, value){ 
        this.setState({season: value});
      };

      render() {
          return ( 
            <Paper zDepth={2}>
              <br></br>
              <h3 className="cardHead">Please Fill out All Fields, You Cannot modify once posted</h3>
              <TextField floatingLabelText="Address" onChange={this.handleAddressChange} style={{marginTop: "-20", marginLeft: "20", width: '90%'}} underlineStyle={{marginRight: "50"}}/>
              <TextField floatingLabelText="Avaliable Rooms" onChange={this.handleRoomChange} style={{marginLeft: "20", width: '90%'}}/>
              <TextField floatingLabelText="Monthly Rent" onChange={this.handleRentChange} style={{marginLeft: "20", width: '90%'}}/>
              <TextField floatingLabelText="Description" onChange={this.handleDescriptionChange} multiLine={true} style={{marginLeft: "20", marginBottom: "10", width: '90%'}}/>
              <DropDownMenu labelStyle={{color: "#C8C8C8"}} selectedMenuItemStyle={{color: "black"}} value={this.state.season} onChange={this.handleDropChange} style={{marginLeft: "-3", width: '96%'}} >
                <MenuItem value={1} primaryText="All" />
                <MenuItem value={2} primaryText="Fall" />
                <MenuItem value={3} primaryText="Winter" />
                <MenuItem value={4} primaryText="Spring" />
                <MenuItem value={5} primaryText="Summer" />
              </DropDownMenu>
              <TextField floatingLabelText="Contact Name" onChange={this.handleNameChange} style={{marginTop: "-10", marginLeft: "20", width: '90%'}}/>
              <TextField floatingLabelText="Contact Number" onChange={this.handleNumberChange} style={{marginLeft: "20", width: '90%'}}/> 
              <TextField floatingLabelText="Contact Email" onChange={this.handleEmailChange} style={{marginLeft: "20", width: '90%'}}/>             
              <FlatButton label="Photo" labelPosition="before" style={styles.button}>
               <input type="file" onChange={this.handleImgChange} name="pic" accept="image/*" style={styles.imageInput}/>
              </FlatButton>
              <Link to={"/front/"}><FlatButton label="Submit" labelPosition="before" onClick={(e) => this.handlePost(e)} style={styles.button}/></Link>
             </Paper>
          );
      }
  }

  Post.childContextTypes = {
      muiTheme: React.PropTypes.object.isRequired,
  };
