import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const CurrentUserQuery = gql`
query {
    currentUser {
        _id
        email
        username
        favorites {
            title
            posterPath
            movieDBId
        }
        dislikes{
            _id
        }
        reviews{
            _id
        }
        moviesSeen{
            _id
            movieDBId
            title
            posterPath
        }
    }
}
`;

const User = props => (
    <Query {...props} query={CurrentUserQuery}>
        {payload => props.children(payload)}
    </Query>
)
export default User;
export { CurrentUserQuery };