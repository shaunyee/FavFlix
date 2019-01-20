import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import Error from './utils/Error';
import { CurrentUserQuery } from './auth/User';
import Unfavorite from './Unfavorite';

const AddMovie = gql`
    mutation($title: String!, $movieDBId: Int!, $posterPath: String!){
        addMovie(title: $title, movieDBId: $movieDBId, posterPath: $posterPath){
            title
            posterPath
            movieDBId
        }
    }
`;
const FavoriteMovie = gql`
    mutation($title: String!, $username: String!){
        favorite(title: $title, username: $username){
            title
        }
    }
`;

const AddToFavorites = ({movie, user}) => {
    const handleFavorite = async (addMovie, favorite) => {
        await addMovie();
        await favorite();
    }
  return (
      <Mutation 
      mutation={FavoriteMovie}
      variables={{
      title: movie.title,
      username: user.username
      }}
      refetchQueries={[{query: CurrentUserQuery}]}
      >
      {(favorite, {loading}) => {
        return(
      <Mutation mutation={AddMovie} 
      variables={{
      title: movie.title, 
      movieDBId: movie.id, 
      posterPath: movie.poster_path,
      }}
      >
      {(addMovie, {loading, error}) => {
          const userFavIds = user.favorites.map(fav => fav.movieDBId);
          const alreadyFavorited = userFavIds.includes(movie.id);
          return(
              <div>
              {alreadyFavorited ? <Unfavorite movie={movie} user={user} /> : <button onClick={() => handleFavorite(addMovie, favorite)}>Add{loading ? "ing" : ''} To Favorites</button>
              }
                {error && <Error err={error.message}/>}
              </div>
            
          )
      }}
      </Mutation>
        )}}
      </Mutation>
  )
}

export default AddToFavorites;
export { AddMovie };