import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { CurrentUserQuery } from './auth/User'

const UnfavoriteMovie = gql`
    mutation($title: String!, $username: String!){
        unfavorite(title: $title, username: $username){
            movieDBId
        }
    }
`;

const Unfavorite = ({movie, user}) => {
  return (
      <Mutation 
      mutation={UnfavoriteMovie}
      variables={{title: movie.title, username: user.username}}
      refetchQueries={[{query: CurrentUserQuery}]}
      >
      {(unfavorite, {loading}) => {
          return(
            <button onClick={() => unfavorite()}>Unfavorit{loading ? "ing" : "e"}</button>
          )}}
      </Mutation>
  )
}
export default Unfavorite;