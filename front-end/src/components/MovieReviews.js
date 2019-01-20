import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Error from './utils/Error';
import DeleteReview from './DeleteReview';
import User from './auth/User';

const GetMovie = gql`
query($movieDBId: Int!){
    getMovie(movieDBId: $movieDBId){
        _id
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
                      const userReviews = currentUser.reviews.map(review => review._id);
                      if(loading) return <div>Loading</div>;
                      return(
                        <div>
                            { getMovie.reviews.map(review => {
                                const madeReview = userReviews.includes(review._id);
                                return(
                                <ul key={review._id}>
                                    <ul>{review.review}{madeReview && <span><DeleteReview id={review._id} movieDBId={movieDBId}/></span>}<p>by: {review.username}</p></ul>
                                </ul>
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
export default MovieReviews;
export {GetMovie};