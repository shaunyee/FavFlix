import React, { Component } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import AddToFavorites from './AddToFavorites';
import User from './auth/User';
import MovieReviews from './MovieReviews';
import AddReview from './AddReview';
import SeenMovie from './SeenMovie';


const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

const GetAllMovies = gql`
query {
  getAllMovies{
    movieDBId
  }
}
`;

class MovieDetail extends Component {

  state = {
    movie: {}
  }

  async componentDidMount() {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=a8cdfa69af55f80964d61a4a96025998&language=en-US`);

      const movie = await res.json();
      await this.setState({ movie });
    }catch(e) {
      console.log(e);
    }
  }

  render() {
    const { movie } = this.state;
    console.log(this.state.movie);
    return (
      <div>
      <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
        <MovieInfo>

            <img src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />

            <div>
              <h1>{movie.title}</h1>
              <h3>{movie.release_date}</h3>
              <p>{movie.overview}</p>
              </div>
        </MovieInfo>
      </MovieWrapper>
        <User>
        {({data: {currentUser}, loading }) => {
          if(loading) return <div>Loading</div>;
            return(
              <Query query={GetAllMovies}>
              {({data: {getAllMovies}, loading, error}) =>{
                if(loading) return <div>Loading</div>;
                if(error) return <div>{error.message}</div>
                const movieDBIds = getAllMovies.map(movie => movie.movieDBId)
                const inDB = movieDBIds.includes(movie.id);
                if(!currentUser){
                  return(
                    <div>
                      <h1>Reviews</h1>
                      {inDB && <MovieReviews movieDBId={movie.id} />}
                    </div>
                  )
                }
                const usersSeenMovies = currentUser.moviesSeen.map(movie => movie.movieDBId);
                const seenThisMovie = usersSeenMovies.includes(movie.id);
                return(
              <div>
                  {!seenThisMovie && <SeenMovie movie={movie} user={currentUser}/>}
               {seenThisMovie && <AddToFavorites movie={movie} user={currentUser}/>}
               {seenThisMovie &&<AddReview title={movie.title} username={currentUser.username} movieDBId={movie.id} posterPath={movie.poster_path}/>}
                    <div>
                      <h1>Reviews</h1>
                      {inDB && <MovieReviews movieDBId={movie.id} />}
                    </div>
              </div>
              )}}
              </Query>
            )}}
        </User>
      </div>
    );
  }
}

export default MovieDetail;
export {GetAllMovies};

const MovieWrapper = styled.div`
  padding-top: 50vh;
  background: url(${(props) => props.backdrop }) no-repeat;
  background-size: cover;
`;

const MovieInfo = styled.div`
  background: white;
  text-align: left;
  padding: 2rem 10%;
  display: flex;
  > div {
    margin-left: 20px;
  }
  img {
    position: relative;
    top: -5rem;
  }
`;

