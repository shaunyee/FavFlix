import React, { Component } from 'react';
import styled from 'styled-components';

import User from './auth/User';
import PleaseSignin from './auth/PleaseSignin';
import MoviePoster from './MoviePoster';


class Profile extends Component {
  state = {
    movieSeenItems: 0,
    moviesFavoriteItems: 0
  }
  nextFavMovie = () => {
    this.setState({
      movieSeenItems: this.state.moviesFavoriteItems + 1
    })
  }
  lastFavMovie = () => {
    this.setState({
      movieSeenItems: this.state.moviesFavoriteItems - 1
    })
  }
  nextSeenMovie = () => {
    this.setState({
      movieSeenItems: this.state.movieSeenItems + 1
    })
  }
  lastSeenMovie = () => {
    this.setState({
      movieSeenItems: this.state.movieSeenItems - 1
    })
  }
  render() {
    const { movieSeenItems, moviesFavoriteItems } = this.state;
    return (
    <PleaseSignin>
            <User>
            {({data: {currentUser}, loading}) => {
                if(loading) return <p>Loading...</p>;
                const moviesSeenFirst = [...currentUser.moviesSeen].reverse();
                const limitMoviesSeen = moviesSeenFirst.splice(movieSeenItems, 5);
                const moviesSeenLeft = (currentUser.moviesSeen.length - moviesSeenFirst.length);
                const moviesFavoriteFirst = [...currentUser.favorites].reverse();
                const limitMovieFavorites = moviesFavoriteFirst.splice(moviesFavoriteItems, 5);
                const moviesFavoriteLeft = (currentUser.moviesSeen.length - moviesFavoriteFirst.length);
                const fav = moviesFavoriteItems < moviesFavoriteLeft -1;
                const showFavNext = fav && currentUser.favorites.length > 5;
                const seen = movieSeenItems < moviesSeenLeft -1;
                const showSeenNext = seen && currentUser.moviesSeen.length > 5
                console.log(showSeenNext)
                return(
                <ProfileWrapper>
                    <h1>{currentUser.username}'s Profile</h1>
                    <p>{currentUser.email}</p>
                    <h3>Favorites</h3><span>{currentUser.favorites.length}</span>
                    <MovieGrid>
                            {limitMovieFavorites.map(fav => (
                            <MoviePoster movie={fav} key={fav.title} />
                            ))}
                    </MovieGrid>
                    {moviesFavoriteItems > 0 && <button onClick={this.lastFavMovie}>last</button>}
                    {showFavNext && <button onClick={this.nextFavMovie}>next</button>}
                    <h3>Movies Seen</h3> <span>{currentUser.moviesSeen.length}</span>
                    <MovieGrid>
                      {limitMoviesSeen.map(movie => {
                        return(
                        <MoviePoster movie={movie} key={movie.title}/>
                      )})}
                    </MovieGrid>
                      {movieSeenItems > 0 && <button onClick={this.lastSeenMovie}>last</button>}
                      {showSeenNext && <button onClick={this.nextSeenMovie}>next</button>}
                </ProfileWrapper>
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

const ProfileWrapper = styled.div`
  color: var(--main-green);
  span {
    color: var(--main-text-color);
  }
  p {
    color: var(--main-text-color);
  }
`;