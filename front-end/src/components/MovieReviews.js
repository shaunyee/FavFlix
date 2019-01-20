import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Error from './utils/Error';
import DeleteReview from './DeleteReview';
import User from './auth/User';
import styled from 'styled-components';

const GetMovie = gql`
query($movieDBId: Int!){
    getMovie(movieDBId: $movieDBId){
        _id
        likes
        reviews {
            _id
            review
            username
        }
    }
}
`;

class MovieReviews extends Component {
  render() {
      const { movieDBId } = this.props;
    return (
        <Query query={GetMovie}
        variables={{movieDBId}}
        >
        {({data: {getMovie}, loading, error}) => {
            if(loading) return <div>Loading</div>;
            if(error) return <Error error={error.message}/>;
            console.log(getMovie)
            return(
                <div>
                <User>
                  {({data: {currentUser}, loading, error}) => {
                      if(loading) return <div>Loading</div>;
                      if(!currentUser){
                          return(
                            <div>
                            { getMovie.reviews.map(review => {
                                return(
                                <ReviewWrapper key={review._id}>
                                    <MovieReviewSection>{review.review}<p>by: {review.username}</p></MovieReviewSection>
                                </ReviewWrapper>
                            )})}
                        </div>
                          )}
                      return(
                        <div>
                            { getMovie.reviews.map(review => {
                                const userReviews = currentUser.reviews.map(review => review._id);
                                const madeReview = userReviews.includes(review._id);
                                return(
                                <ReviewWrapper key={review._id}>
                                    <MovieReviewSection>{review.review}{madeReview && <span><DeleteReview id={review._id} movieDBId={movieDBId}/></span>}<p>by: {review.username}</p></MovieReviewSection>
                                </ReviewWrapper>
                            )})}
                        </div>
                      )}}  
                </User>
            </div>
            )}}
        </Query>
    )
  }
}

const ReviewWrapper = styled.ul`
    padding-left: 0;
    margin-left: 0;
    color: var(--main-text-color);
`;
const MovieReviewSection = styled.ul`
    margin-left: 0;
    padding-left: 0;
`;
export default MovieReviews;
export {GetMovie};