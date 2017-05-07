import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class ContactInfo extends React.Component {

   getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
   }

  constructor(props) {
    super(props);
    this.handleTouchTap = this.handleTouchTap.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.state = {
      open: false,
    };
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap(event){
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  render() { 
    return (
      <div>
        <RaisedButton
          onTouchTap={this.handleTouchTap}
          label="Contact Information"
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem primaryText={this.props.data.name} />
            <MenuItem primaryText={this.props.data.phone} />
            <MenuItem primaryText={this.props.data.email} />
          </Menu>
        </Popover>
      </div>
    );
  }
}

  ContactInfo.childContextTypes = {
      muiTheme: React.PropTypes.object.isRequired,
  };