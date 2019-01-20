import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

export default class MoviePoster extends Component {
  render() {
      const posterPath = 'http://image.tmdb.org/t/p/w154';
      const {movie} = this.props;
    return (
      <div>
        <Link to={`/movie/${movie.id || movie.movieDBId}`}><MoviePosterImg src={`${posterPath}${movie.poster_path || movie.posterPath}`} alt={movie.title}/></Link>
        <MovieTitle>{movie.title}</MovieTitle>
      </div>
    )
  }
}

const MoviePosterImg = styled.img`
    transition: all .4s ease-in-out;

    :hover {
      transform: scale(1.1);
    }
  `;

const MovieTitle = styled.p`
    color: #FFF;
    margin: 0;
    font-size: .85rem;
`;