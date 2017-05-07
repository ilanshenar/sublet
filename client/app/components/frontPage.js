import React from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Navbar from './nav';
import Feed from './feed';

  export default class FrontPage extends React.Component {

      getChildContext() {
          return { muiTheme: getMuiTheme(baseTheme) };
      }

      render() {
          return ( <div>
        		<Navbar />
            <Feed data={1}/>
              </div>
          );
      }
  }

  FrontPage.childContextTypes = {
      muiTheme: React.PropTypes.object.isRequired,
  };
