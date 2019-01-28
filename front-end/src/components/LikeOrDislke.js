import React from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import DislikeMovie from './DislikeMovie';
import RelikeMovie from './RelikeMovie';
import { GetMovie } from './MovieReviews';
import Error from './utils/Error';
import AddToFavorites from './AddToFavorites';

const LikeOrDislke = ({ movie, user }) => {
  return (
      <Query query={ GetMovie } variables={{ movieDBId: movie.id }}>
      {({data: {getMovie}, loading, error}) => {
          if(loading) return <div>Loading...</div>;
          if(error) return <Error error={error.message} />;
          const userDislikes = user.dislikes.map(dislikes => (
              dislikes._id
          ));
          const userDislikesMovie = userDislikes.includes(getMovie._id)
          if(!userDislikesMovie) {
              return(
                  <AttrDiv>
                      <AddToFavorites movie={movie} user={user}/>
                      <DislikeMovie movie={movie} user={user}/>
                  </AttrDiv>
              )}
          return(
              <div>
               <RelikeMovie movie={movie} user={user}/>
              </div>
          )}}
      </Query>
  )
}
export default LikeOrDislke;

const AttrDiv = styled.div`
    display: inline-flex
`;