import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import InfiniteScroll from 'react-infinite-scroll-component'
import YouTubeRecord from "./YouTubeRecord";

class SearchResults extends Component {

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
      <InfiniteScroll hasMore={true}
                      style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', paddingTop: '4rem'}}
                      next={this.props.loadMoreEntries}>
        {items.map(item => <YouTubeRecord key={item.id.videoId} item={item}/>)}
      </InfiniteScroll>
    );
  }
}

const queryNext = gql`
  query Search ($query : String, $pageToken : String) {
      youtubeV3(key:""){
        search{
          list(q: $query, part:"snippet", type:"video", maxResults:14, pageToken : $pageToken ) {
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
     }`

export default graphql(gql`
  query Search ($query : String) {
      youtubeV3(key:""){
        search{
          list(q: $query, part:"snippet", type:"video", maxResults:14) {
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
        query: props.search.trim()
      }
    }),

    props: (args) => {

      const {data} = args
      return {
        data,
        loadMoreEntries: () => {
          return data.fetchMore({
            query: queryNext,
            variables: {
              pageToken: data.youtubeV3.search.list.nextPageToken,
              query: data.variables.query

            },
            updateQuery: (previousResult, next) => {
              return {
                youtubeV3: {
                  search: {
                    // By returning `cursor` here, we update the `loadMore` function
                    // to the new cursor.
                    list: {
                      nextPageToken: next.fetchMoreResult.youtubeV3.search.list.nextPageToken,
                      // Put the new comments in the front of the list
                      items: [...previousResult.youtubeV3.search.list.items, ...next.fetchMoreResult.youtubeV3.search.list.items],
                    }
                  }
                },
              }

            }
          })
        }
      }
    }
  })(SearchResults)


