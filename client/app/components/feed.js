import React from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {getCardInfo} from '../server';

import FeedCard from './feedcard';

  export default class Feed extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        season: props.data,
        cards: []
      };
    }

      getChildContext() {
          return { muiTheme: getMuiTheme(baseTheme) };
      }

      changeFeed(sid){
        this.setState({season: sid});
        this.refresh();
      }

      refresh() {
        getCardInfo(this.state.season, (cardData) => {
        this.setState(cardData);
         });
      }

      componentDidMount() {
        this.refresh();
      }

      render() {
          if(this.state.cards.length !== 0)
          return ( 
            <div>
              {this.state.cards.map((card, i) => {
                return(
                <div className="card"><FeedCard key={i} data={card} /> </div>
                );
              })
            }
             </div>
          );
        else return(null);
      }
  }

  Feed.childContextTypes = {
      muiTheme: React.PropTypes.object.isRequired,
  };
