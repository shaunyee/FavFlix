import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { GetMovie } from './MovieReviews';
import styled from 'styled-components';

const DeleteUserReview = gql`
mutation($_id: String!) {
	deleteReview(_id: $_id){
        message
  }
}
`;

const DeleteReview = ({id, movieDBId}) => {
  return (
    <Mutation 
    mutation={DeleteUserReview}
    variables={{_id: id}}
    refetchQueries={[{query: GetMovie, variables: {movieDBId}}]}
    >
    {(deleteReview, {loading}) => (
        <DeleteReviewBtn onClick={() => deleteReview()}>Delet{loading ? "ing" : "e"}</DeleteReviewBtn>
    )}
    </Mutation>
  )
}

const DeleteReviewBtn = styled.button`
  margin-left: 2rem;
`;
export default DeleteReview;