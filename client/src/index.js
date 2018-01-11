import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

const client = new ApolloClient({
  link: new HttpLink({uri: `/graphql`}),
  cache: new InMemoryCache({

      dataIdFromObject: object => {

        switch (object.__typename) {
          case "SearchResult":
            return object.id.videoId
        }

        return object.id

      }

    }
  ),

});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>,
  document.getElementById('root')
)

