import React from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Navbar from './nav';
import Feed from './feed';

  export default class SeasonPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        season: props.data,
      };
    }

      getChildContext() {
          return { muiTheme: getMuiTheme(baseTheme) };
      }

      render() {
          return ( 
            <div>
        	   <Navbar />
             <Feed data={this.state.season}/>
            </div>
          );
      }
  }

  SeasonPage.childContextTypes = {
      muiTheme: React.PropTypes.object.isRequired,
  };
