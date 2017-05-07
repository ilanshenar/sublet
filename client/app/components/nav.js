import React from 'react';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreHorizIcon from 'material-ui/svg-icons/navigation/more-horiz';
import NoteAddIcon from 'material-ui/svg-icons/action/note-add';
import Avatar from 'material-ui/Avatar';

import {changeFeed} from './feed';

  export default class Navbar extends React.Component {

      getChildContext() {
          return { muiTheme: getMuiTheme(baseTheme) };
      }

      render() {
          return ( <div>
              <AppBar 
              title={<Link to={"/front/"} style={{ textDecoration: 'none' }}><span className="title">UniSub</span></Link>}
              iconElementLeft={
                <Link to={"/front/"}><Avatar
                  className="avatar"
                  src="../img/umass.jpg"
                  size={30}
        /></Link>}
              iconElementRight={
                <div>
                  <IconButton><Link to={"/post/"} style={{ textDecoration: 'none' }}><NoteAddIcon color="white"/></Link></IconButton>
                  <IconMenu
                    iconButtonElement={
                      <IconButton><MoreHorizIcon color="white"/></IconButton>
                    }
                   targetOrigin={{horizontal: 'right', vertical: 'top'}}
                   anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  >
                    <Link to={"/front/"} style={{ textDecoration: 'none' }}><MenuItem primaryText="All" /></Link>
                    <Link to={"/season/" + "2"} style={{ textDecoration: 'none' }}><MenuItem primaryText="Fall" /></Link>
                    <Link to={"/season/" + 3 } style={{ textDecoration: 'none' }}><MenuItem primaryText="Winter" /></Link>
                    <Link to={"/season/" + 4} style={{ textDecoration: 'none' }}><MenuItem primaryText="Spring"  /></Link>
                    <Link to={"/season/" + 5} style={{ textDecoration: 'none' }}><MenuItem primaryText="Summer" /></Link>
                  </IconMenu>
                  </div>
        }
              style={{
                backgroundColor: '#800000',
              }}>
              </AppBar>
              </div>
          );
      }
  }

  Navbar.childContextTypes = {
      muiTheme: React.PropTypes.object.isRequired,
  };
