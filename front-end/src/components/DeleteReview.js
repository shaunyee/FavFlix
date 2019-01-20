import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { GetMovie } from './MovieReviews';

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
        <button onClick={() => deleteReview()}>Delet{loading ? "ing" : "e"}</button>
    )}
    </Mutation>
  )
}
export default DeleteReview;