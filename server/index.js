const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const cors = require('cors');

require('dotenv').config({path:'../variables.env'});
const User = require('./models/User');
const Movie = require('./models/Movie');
const Review = require('./models/Review');

const {typeDefs} = require('./schema');
const {resolvers} = require('./resolvers');


const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_DB_URI, {useNewUrlParser: true} )
.then(()=> console.log("Connected to DB"))
.catch(error => console.log(error));

const ObjectId = require('mongoose').Types.ObjectId;
ObjectId.prototype.valueOf = function () {
	return this.toString();
};

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: ({ req, res }) => ({
    User,
    Movie,
    Review,
    req,
    res
  }) 
});

//origin options not being set, had to change the node modules to accept origin of localhoast 3000
const app = express();
const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3000',
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use((req, res, next) =>{
  const { token } = req.cookies
  if(token){
    const userId = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId
  }
  next();
})

server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
);