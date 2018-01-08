import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import InfiniteScroll from 'react-infinite-scroll-component'
import YouTubePlayer from "./YouTubePlayer";
import Portal from "./Portal";

export default class YouTubeRecord extends Component {

  constructor() {
    super()
    this.state = {showModal: false}
  }

  render() {

    console.log(this.state.showModal)

    const {item} = this.props

    return [

      this.state.showModal ? <YouTubePlayer player={this} item={item}/> : false,

      <div key='a' style={{cursor: 'pointer'}} onClick={() => this.setState({showModal: true})}>

      <img style={{borderRadius: 4, margin: '1rem'}}
           src={`https://img.youtube.com/vi/${item.id.videoId}/hqdefault.jpg`}/>
    </div>]
  }

}