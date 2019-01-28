const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.resolvers = {
    Query: {
      currentUser: async (root, args, {User, req}, info) => {
        if(!req.userId){
          return null
        }
        const user = await User.findOne({_id: req.userId.userId})
        .populate([{
          path: 'favorites',
          model: 'Movie'
      },
      {
        path: 'moviesSeen',
        model: 'Movie'
      }]
      );
        return user
      },
      getAllMovies: async (root, args, {Movie}) => {
        const movie = Movie.find();
        return movie
      },
      getMovie: async (root, { movieDBId }, {Movie}) => {
        const movie = await Movie.findOne({movieDBId})
        .populate({
          path: 'reviews',
          model: 'Review'
        });
        return movie  
      }
    },
    Mutation: {
      register: async (root, {username, password, email}, {User, res}) => {
        const user = await User.findOne({ username });
        if(user) {
          throw new Error("User Already Exists")
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await new User({username, password: hashedPassword, email }).save();
        const token = jwt.sign({userId: newUser._id}, process.env.APP_SECRET);
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 10000 * 60 * 24 * 365, 
          });
        return newUser
      },
      signin: async (root, {username, password}, {User, res}) => {
        const user = await User.findOne({ username });
        if(!user){
          throw new Error("There is no user with that username");
        }
        const verifiedPassword = bcrypt.compare(password, user.password);
        if(!verifiedPassword){
          throw new Error("Invalid Password");
        }
        const token = jwt.sign({userId: user._id}, process.env.APP_SECRET);
        res.cookie('token', token, {
          httpOnly: true,
          maxAge: 10000 * 60 * 24* 365,
        })
        return user
      },
      logout: (root, args, { res }) => {
        res.clearCookie('token');
        return { message: "Goodbye" };
      },
      addMovie: async (root, {title, movieDBId, posterPath }, {Movie}) => {
        const movie = await Movie.findOne({title});
        if(!movie) {
          const newMovie = await new Movie({
            title,
            movieDBId,
            posterPath
          }).save();
          return newMovie
        }
        return movie
      },
      seenMovie: async(root, {title, username}, {Movie, User}) => {
        const movie = await Movie.findOne({ title });
        const user = await User.findOneAndUpdate({username}, {$addToSet: {moviesSeen: movie._id}});
        return movie
      },
      favorite: async (root, {title, username}, {Movie, User}) => {
        const movie = await Movie.findOneAndUpdate({title}, {$inc: {likes: 1}});
        const user = await User.findOneAndUpdate({username}, {$addToSet: {favorites: movie._id}})
      },
      unfavorite: async (root, { title, username }, {Movie, User}) => {
        const movie = await Movie.findOneAndUpdate({ title }, {$inc: {likes: -1}});
        const user = await User.findOneAndUpdate({username}, {$pull: {favorites: movie._id}});
        return movie
      },
      dislikeMovie: async (root, { title, username }, { Movie, User }) => {
        const movie = await Movie.findOneAndUpdate({ title }, {$inc: { dislikes: 1 }});
        const user = await User.findOneAndUpdate({ username }, {$addToSet: { dislikes: movie._id }})
        return movie
      },
      relikeMovie: async (root, { title, username }, { Movie, User }) => {
        const movie = await Movie.findOneAndUpdate({ title }, {$inc: { dislikes: -1 }});
        const user = await User.findOneAndUpdate({ username }, {$pull: { dislikes: movie._id }})
      },
      addReview: async (root, { review, title, username, }, {Review, User, Movie}) => {
        const newReview = await new Review({
            review,
            username
          }).save();
          const movie = await Movie.findOneAndUpdate({ title }, {$addToSet: {reviews: newReview._id}});
          const user = await User.findOneAndUpdate({ username }, {$addToSet: {reviews: newReview._id}});
          return newReview;
      },
      deleteReview: async (root, { _id }, {Review}) => {
        const review = await Review.findOneAndRemove({ _id });
        return {message: "Review Deleted"};
      },
    }
  };
  