import React from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';


import Navbar from './nav';
import Post from './post';

  export default class PostPage extends React.Component {

      getChildContext() {
          return { muiTheme: getMuiTheme(baseTheme) };
      }

      render() {
          return ( 
            <div>
        	   	<Navbar />
              <div className="post"><Post /></div>
            </div>
          );
      }
  }

  PostPage.childContextTypes = {
      muiTheme: React.PropTypes.object.isRequired,
  };
