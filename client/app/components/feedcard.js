import React from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import ContactInfo from './contactInfo';

  export default class FeedCard extends React.Component {
    constructor(props) {
      super(props);
      this.state = props.data;
    }

      getChildContext() {
          return { muiTheme: getMuiTheme(baseTheme) };
      }

      render() 
      { 
          return ( 
            <Card>
              <CardHeader
               title={this.state.address}
               subtitle= {this.state.postdate}
               />
              <CardMedia  overlay={
                <CardTitle 
                title={this.state.title} 
                subtitle={this.state.price} />}
               >
                <img src={this.state.img} width="100%"/>
              </CardMedia>
              <CardText>
                {this.state.body}
              </CardText>
              <CardActions>
                <ContactInfo data={this.state.contactInfo[0]}/>
              </CardActions>
            </Card>
            );
      }
  }

  FeedCard.childContextTypes = {
      muiTheme: React.PropTypes.object.isRequired,
  };