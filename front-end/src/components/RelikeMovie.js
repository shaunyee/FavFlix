import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';

import {CurrentUserQuery} from './auth/User';
import {GetMovie} from './MovieReviews';

const RelikeThisMovie = gql`
    mutation($title: String!, $username: String!){
        relikeMovie(title: $title, username: $username){
            _id
        }
    }
`;

const RelikeMovie = ({ movie, user }) => {
  return (
      <Mutation 
      mutation={RelikeThisMovie} 
      variables={{title: movie.title, username: user.username}}
      refetchQueries={[{query: GetMovie, variables: {movieDBId: movie.id}}, {query: CurrentUserQuery}]}
      >
        {(relikeMovie, {loading}) => (
            <RelikeButton onClick={() => relikeMovie()}>Relik{loading ? 'ing' : 'e'}</RelikeButton>
        )}
      </Mutation>
  )
}
export default RelikeMovie;

const RelikeButton = styled.button`
    display: block;
    background: var(--main-green);
    border: none;
    color: var(--main-bg-color);
    font-size: 1rem;
    padding: .75rem;
    border-radius: 25px;
    margin-top: .5rem;

    :hover {
        background: var(--main-green-hover);
    }
`;