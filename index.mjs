import dotenv from 'dotenv'

import gql from 'graphql'
import graphqlHTTP from 'express-graphql'
import express from 'express'
import gapiToGraphQL from 'gapi-to-graphql'
// Use any of the APIs included under the google_apis/ folder, or bring your own API descriptor
import YouTubeAPI from 'gapi-to-graphql/google_apis/youtube-v3'
import graphAddMiddleware from 'graphql-add-middleware'


dotenv.config()
const app = express()

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
    // eventually construct a full path here
    const {prev, key} = path
    return key
}


graphAddMiddleware.addMiddleware(schema, async function (root, args, context, info, next) {
    // you can modify root, args, context, info

    const path = getPath(info.path)

    switch (path) {
        case 'youtubeV3':
            args.key = process.env.YOUTUBE_API
            break
    }


    const result = await next()
    // you can modify result
    return result // you must return value
})


app.use('/graphql',
    graphqlHTTP({
        schema: GraphQLSchema,
        graphiql: true
    })
)


const port = 4000
app.listen(port)
console.log(`Please open http://localhost:${port}/graphql`)