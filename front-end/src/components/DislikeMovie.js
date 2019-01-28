import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';

import {CurrentUserQuery} from './auth/User';
import {GetMovie} from './MovieReviews';

const UserDislikeMovie = gql`
    mutation($title: String!, $username: String!){
        dislikeMovie(title: $title, username: $username){
            _id
        }
    }
`;

const DislikeMovie = ({ movie, user }) => {
    const dislikeThisMovie = async(dislikeMovie) => {
        await dislikeMovie();
    }
  return (
      <Mutation 
      mutation={UserDislikeMovie} 
      variables={{title: movie.title, username: user.username}}
      refetchQueries={[{query: GetMovie, variables: {movieDBId: movie.id}}, {query: CurrentUserQuery}]}
      >
      {(dislikeMovie, {loading}) =>{
            return(
            <DislikeButton onClick={() => dislikeThisMovie(dislikeMovie)}>
                Dislik{loading ? 'ing' : 'e'} Movie
            </DislikeButton>
            )}}
      </Mutation>
  )
}

export default DislikeMovie;

const DislikeButton = styled.button`
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