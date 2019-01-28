const {gql} = require('apollo-server-express')

 exports.typeDefs = gql`

type SucessMessage {
   message: String
 }

type Query {
  getAllMovies: [Movie]
  currentUser: User
  getMovie(movieDBId: Int!): Movie
},
type User {
  _id: String
  username: String!
  email: String!
  joinDate: String
  favorites: [Movie]
  dislikes: [Movie]
  reviews: [Review]
  moviesSeen: [Movie]
}
type Movie {
  _id: String
  title: String!
  movieDBId: Int!
  posterPath: String!
  likes: Int
  dislikes: Int
  reviews: [Review]
}
type Review {
  _id: String!
  review: String
  dateAdded: String
  username: String
}
type Mutation {
  register(username: String!, password: String!, email: String!): User!
  signin(username: String!, password: String!): User!
  logout: SucessMessage
  addMovie(title: String!, movieDBId: Int!, posterPath: String!): Movie!
  favorite(title: String!, username: String!): Movie
  unfavorite(title: String!, username: String!): Movie
  dislikeMovie(title: String! username: String!): Movie
  relikeMovie(title: String!, username: String!): Movie
  seenMovie(title: String!, username: String!): Movie
  addReview(review: String!, title: String!, username: String!): Review!
  deleteReview(_id: String!): SucessMessage 
}
`;
