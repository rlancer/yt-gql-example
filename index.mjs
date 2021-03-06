import dotenv from 'dotenv'
import gql from 'graphql'
import graphqlHTTP from 'express-graphql'
import express from 'express'
import gapiToGraphQL from 'gapi-to-graphql'
// Use any of the APIs included under the google_apis/ folder, or bring your own API descriptor
import YouTubeAPI from 'gapi-to-graphql/google_apis/youtube-v3'
import graphAddMiddleware from 'graphql-add-middleware'
import cors from 'cors'
import path from 'path'
import expose from './expose.js'
// workaround to get dirname
const {__dirname} = expose

dotenv.config()
const app = express()


app.use(cors())
// need this separate assignment when using nodes experimental modules feature
const {GraphQLObjectType, GraphQLSchema} = gql

const youtubeApi = gapiToGraphQL({gapiAsJsonSchema: YouTubeAPI, graphQLModule: gql})


const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {...youtubeApi}
  })
})


const getPath = path => {

  const builtPath = []

  const handlePathPart = sp => {

    let {prev, key} = sp

    builtPath.push(key)

    if (prev)
      handlePathPart(prev)

  }

  handlePathPart(path)


  return builtPath.join('/')
}


graphAddMiddleware.addMiddleware(schema, async function (root, args, context, info, next) {
  // you can modify root, args, context, info

  const path = getPath(info.path)

  switch (path) {
    case 'youtubeV3':
      args.key = process.env.YOUTUBE_API
      break
  }

  return await next()
})

const router = express.Router()


router.use('/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
)

app.use(router)
app.use(express.static(path.join(__dirname, 'client/build')))

const port = process.env.PORT || 4000
app.listen(port)
console.log(`Please open http://localhost:${port}/graphql`)