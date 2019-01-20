import React, { Component } from 'react';
import styled from 'styled-components';

import User from './auth/User';
import PleaseSignin from './auth/PleaseSignin';
import MoviePoster from './MoviePoster';


class Profile extends Component {
  render() {
    return (
    <PleaseSignin>
            <User>
            {({data: {currentUser}, loading}) => {
                console.log(currentUser)
                if(loading) return <p>Loading...</p>;
                return(
                <div>
                    <h1>{currentUser.username}' Profile</h1>
                    <p>{currentUser.email}</p>
                    <h3>Favorites</h3>
                    <MovieGrid>
                            {currentUser.favorites.map(fav => (
                            <MoviePoster movie={fav} key={fav.title} />
                            ))}
                    </MovieGrid>
                    <h3>Movies Seen</h3>
                    <MovieGrid>
                      {currentUser.moviesSeen.map(movie => (
                        <MoviePoster movie={movie} key={movie.title}/>
                      ))}
                    </MovieGrid>
                </div>
                )}}
            </User>
    </PleaseSignin>
    )
  }
}
export default Profile;

const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(5, 1fr);
  grid-row-gap: 1rem;
`;