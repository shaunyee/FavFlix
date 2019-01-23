import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

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
        <LogoutButton onClick={() => logoutUser(logout)}>LOGOUT</LogoutButton>
      )}
      </Mutation>
  )
}
export default withRouter(Logout);

const LogoutButton = styled.button`
     background:none!important;
     color: var(--main-green);
     border:none; 
     padding:0!important;
     font: inherit;
     cursor: pointer;
     :hover{
         color: var(--main-green-hover)
     }
`;