import gql from 'graphql'
import graphqlHTTP from 'express-graphql'
import express from 'express'
import gapiToGraphQL from 'gapi-to-graphql'
// Use any of the APIs included under the google_apis/ folder, or bring your own API descriptor
import YouTubeAPI from 'gapi-to-graphql/google_apis/youtube-v3'

import graphAddMiddleware from 'graphql-add-middleware'

const app = express()

// need this separate assignment when using nodes experimental modules feature
const {GraphQLObjectType, GraphQLSchema} = gql


const youtubeApi = gapiToGraphQL({gapiAsJsonSchema: YouTubeAPI, graphQLModule: gql})


const ssss = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {...youtubeApi}
  })
})


graphAddMiddleware.addMiddleware(ssss, async function (root, args, context, info, next) {
  // you can modify root, args, context, info


  console.log('roots')

  const result = await next()
  // you can modify result
  return result // you must return value
})



app.use('/graphql',
  graphqlHTTP({
    schema: ssss,
    graphiql: true
  })
)


const port = 4000
app.listen(port)
console.log(`Please open http://localhost:${port}/graphql`)