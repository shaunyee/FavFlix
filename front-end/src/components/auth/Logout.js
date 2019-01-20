import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { CurrentUserQuery } from './User';

const LogoutUser = gql`
mutation{
    logout{
        message
    }
}
`;

 const Logout = (props) => {
    const logoutUser = (logout) => {
        logout().then(() => {
            props.history.push("/");
        })
     }
  return (
      <Mutation 
      mutation={LogoutUser} 
      refetchQueries={[{
          query: CurrentUserQuery
      }]}>
      {(logout) => (
        <button onClick={() => logoutUser(logout)}>Logout</button>
      )}
      </Mutation>
  )
}
export default withRouter(Logout);