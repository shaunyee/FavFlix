import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { GetMovie } from './MovieReviews';
import { CurrentUserQuery } from './auth/User';


const ReviewMovie = gql`
mutation($review: String!, $title: String!, $username: String!) {
  addReview(review: $review, title: $title, username: $username){
    review
  }
}`;

const initalState = {
    review: ""
}
class AddReview extends Component {
    state = {
        ...initalState
    }
    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name] :value
        })
    }
    handleSubmit = async (e,addReview) => {
        e.preventDefault();
        await addReview();
    }
    clearForm = () => {
        this.setState({
            ...initalState
        })
    }
  render() {
      const { username, title, movieDBId} = this.props;
      const { review } = this.state;
    return (
        <Mutation 
        mutation={ReviewMovie}
        variables={{
        title,
        username, 
        review}}
        refetchQueries={[ {query: GetMovie, variables:{movieDBId}}, {query: CurrentUserQuery} ]}
        >
        {(addReview, {loading, error }) => {
            return(
        <div>
            <form id="addReview" onSubmit={(e) => this.handleSubmit(e, addReview)}>
                <textarea onChange={this.handleChange} name="review" cols="100" rows="5" />
                <button>Add{loading ? "ing" : ""} Review</button>
            </form>
            {error && error.message}
        </div>
            )}}
        </Mutation>
    )
  }
}
export default AddReview;