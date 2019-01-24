import React from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import { GetMovie } from './MovieReviews';
import Error from './utils/Error';
import thumbsUp from '../assets/thumbsUp.svg';
import thumbsDown from '../assets/thumbsDown.svg';

const MovieStats = ({ movieDBId }) => {
  return (
    <Query query={GetMovie} variables={{ movieDBId }}>
    {({data:{getMovie}, loading, error}) => {
        if(loading) return <div>Loading</div>
        if(error) return <Error error={error.message}/>
        return(
            <StatContainer>
            <MovieStatSpan><StatIcons src={thumbsUp} alt="Likes"/> {getMovie.likes}</MovieStatSpan><MovieStatSpan><StatIcons src={thumbsDown} alt="Dislikes"/> {getMovie.dislikes}</MovieStatSpan>
            </StatContainer>
        )}}
    </Query>
  )
}
export default MovieStats;

const MovieStatSpan = styled.span`
    color: var(--main-text-color);
    margin-right: 10px;
`;

const StatIcons = styled.img`
    width: 40px;
    height: 40px;
`;

const StatContainer = styled.div`
    position: relative;
    text-align: right;
`;