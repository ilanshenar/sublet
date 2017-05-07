import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, hashHistory} from 'react-router';

import FrontPage from './components/frontPage';
import PostPage from './components/postPage';
import SeasonPage from './components/seasonPage';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

class Front extends React.Component {
  render() {
    return(
      <div>
        <FrontPage />
      </div>
      );
  }
}

class Season extends React.Component {
  render() { console.log(this.props.params.id);
    return(
      <div>
        <SeasonPage data={this.props.params.id}/>
      </div>
      );
  }
}

class Post extends React.Component {
  render() {
    return(
      <div>
        <PostPage />
      </div>
      );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
      {this.props.children}
      </div>
    );
  }
}


ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Front} />
     <Route path="front/" component={Front} />
     <Route path="post/" component={Post} />
     <Route path="season/:id" component={Season} /> 
     </Route>
  </Router>
),document.getElementById('main-feed'));
