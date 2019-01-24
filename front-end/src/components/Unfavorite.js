import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';

import { CurrentUserQuery } from './auth/User';
import { GetMovie } from './MovieReviews';
import unFavoriteIcon from '../assets/unfavorite.svg';


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
      refetchQueries={[{query: CurrentUserQuery}, {query: GetMovie, variables: {movieDBId: movie.id}}]}
      >
      {(unfavorite, {loading}) => {
          return(
            <UnFavoriteButton onClick={() => unfavorite()}><UnFavoriteIcon src={unFavoriteIcon} alt="unfav"/>Unfavorit{loading ? "ing" : "e"}</UnFavoriteButton>
          )}}
      </Mutation>
  )
}
export default Unfavorite;

const UnFavoriteButton = styled.button`
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

const UnFavoriteIcon = styled.img`
    height: 30px;
    width: 30px
`;