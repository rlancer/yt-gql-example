import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import InfiniteScroll from 'react-infinite-scroll-component'
import YouTubeRecord from "./YouTubeRecord";

class RelatedVideos extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {data} = this.props

    if (data.loading) {
      return <div style={{paddingTop: '6rem', display: 'flex', justifyContent: 'center'}}><img src='/Ripple.gif'/></div>
    }

    console.log('data', data)

    const {items} = data.youtubeV3.search.list

    return (
      <div>  {items.map(item => <YouTubeRecord key={item.id.videoId} item={item}/>)}</div>

    );
  }
}



export default graphql(gql`
  query Search ($videoId : String) {
      youtubeV3(key:""){
        search{
          list(relatedToVideoId: $videoId, part:"snippet", type:"video", maxResults:14) {
            etag
            eventId
            kind
            nextPageToken
            prevPageToken
            regionCode
            visitorId,
            items{
              id {
                videoId
              }
              snippet {
                title
              }
            }
          }   
        } 
      }
     }`,
  {
    options: (props) => ({
      variables: {
        videoId: props.videoId
      }
    })

  })(RelatedVideos)


