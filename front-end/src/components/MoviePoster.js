import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class MoviePoster extends Component {
  render() {
      const posterPath = 'http://image.tmdb.org/t/p/w154';
      const {movie} = this.props;
    return (
      <div>
        <Link to={`/movie/${movie.id || movie.movieDBId}`}><img src={`${posterPath}${movie.poster_path || movie.posterPath}`} alt={movie.title}/></Link>
      </div>
    )
  }
}

