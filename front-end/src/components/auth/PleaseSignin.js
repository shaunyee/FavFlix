import React from 'react';
import { Query } from 'react-apollo';

import Signin from '../auth/Signin';
import { CurrentUserQuery } from '../auth/User';

const PleaseSignin = props => {
  return (
    <Query query={CurrentUserQuery}>
      {({data, loading}) =>{
          if(loading) return <p>Loading...</p>;
          if(!data.currentUser){
              return(
                  <div>
                      <h1>Please Sign In</h1>
                      <Signin />
                  </div>
              )
          }
          return props.children
      }}
    </Query>
  )
}
export default PleaseSignin;