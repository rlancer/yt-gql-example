import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import InfiniteScroll from 'react-infinite-scroll-component'
import YouTubeDetails from "./YouTubeDetails";

export default class YouTubePlayer extends Component {

  constructor() {
    super()
  }

  render() {

    const {item} = this.props

    return <div
      style={{position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, display: 'flex'}}>


      <iframe id="ytplayer" type="text/html" width="100%" height="100%"
              src={`https://www.youtube.com/embed/${item.id.videoId}?autoplay=1`}
              frameBorder="0"/>


      <div style={{
        width: 350,
        padding: '1rem',
        position: 'fixed',
        backgroundColor: '#fff',
        zIndex: 100,
        bottom: 100,
        height: 100,
        left: 0,
        right: 0,
        color: '#fff',
        backgroundColor: '#000'
      }}>

        <div onClick={()=>this.props.player.setState({showModal: false})}>Close</div>

        <YouTubeDetails item={item}/>

      </div>
    </div>


  }
}