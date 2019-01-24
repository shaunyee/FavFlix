import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';

import Error from './utils/Error';
import { CurrentUserQuery } from './auth/User';
import Unfavorite from './Unfavorite';
import favoriteIcon from '../assets/favorite.svg';
import { GetMovie } from './MovieReviews';

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
      refetchQueries={[{query: CurrentUserQuery}, {query: GetMovie, variables: {movieDBId: movie.id}}]}
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
              {alreadyFavorited ? <Unfavorite movie={movie} user={user} /> : <FavoriteButton onClick={() => handleFavorite(addMovie, favorite)}><FavoriteIcon src={favoriteIcon} alt="fav"/>Favorit{loading ? "ing" : "e"}</FavoriteButton>
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

const FavoriteButton = styled.button`
    display: block;
    background: #FF5454;
    border: none;
    color: var(--main-bg-color);
    font-size: 1rem;
    padding: .75rem;
    border-radius: 25px;
    margin-top: .5rem;

    :hover {
        background: #BA3E3E;
    }
`;

const FavoriteIcon = styled.img`
    height: 20px;
    width: 20px
`;