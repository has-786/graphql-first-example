const { ApolloServer, gql } = require('apollo-server-express');
const express=require('express')
const cors=require('cors')

const startApolloServer=require('./startApolloServer')
const books=require('./books')
const events=require('./events')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }
  type Event {
    name: String
    venue: String
  }

  input BookInput{
      title: String!
      author: String!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    events: [Event]
  }

  type Mutation {
    addBooks(title:String!,author:String!): Book
    addEvents(name:String!,venue:String!): Event

  }
`;

const resolvers = {
    Query: {
        books: () => books,
        events: () => events,
    },
    Mutation:{
        addBooks:(_,book)=>{ books.push(book); return book; },
        addEvents:(_,event)=>{ events.push(event); return event; }
    }
  };
  
const apolloServer = new ApolloServer({ typeDefs,  resolvers,});

const app=express()
app.use(cors())
startApolloServer(app,apolloServer);

const url=4040
app.listen(url,()=>console.log(`Server running on port ${url}`))