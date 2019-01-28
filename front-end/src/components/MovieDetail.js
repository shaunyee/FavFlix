import React, { Component } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import User from './auth/User';
import MovieReviews from './MovieReviews';
import AddReview from './AddReview';
import SeenMovie from './SeenMovie';
import MovieStats from './MovieStats';
import LikeOrDislke from './LikeOrDislke';


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
                      <UserReviewSection>
                      {inDB && <MovieStats movieDBId={movie.id}/>}
                      <h1>Reviews</h1>
                      <SectionBreak></SectionBreak>
                      {inDB && <MovieReviews movieDBId={movie.id} />}
                      </UserReviewSection>
                  )
                }
                const usersSeenMovies = currentUser.moviesSeen.map(movie => movie.movieDBId);
                const seenThisMovie = usersSeenMovies.includes(movie.id);
                return(
              <UserReviewSection>
                {!seenThisMovie && <SeenMovie movie={movie} user={currentUser}/>}
                {seenThisMovie && <MovieStats movieDBId={movie.id}/>}
                {seenThisMovie && <LikeOrDislke movie={movie} user={currentUser}/>}
                <h1>Reviews</h1>
                      <SectionBreak></SectionBreak>
                      {seenThisMovie &&<AddReview title={movie.title} username={currentUser.username} movieDBId={movie.id} posterPath={movie.poster_path}/>}
                      {inDB && <MovieReviews movieDBId={movie.id} />}
              </UserReviewSection>
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
  background: var(--main-bg-color);
  text-align: left;
  padding: 2rem 10%;
  display: flex;
  color: var(--main-text-color);
  h1 {
    color: var(--main-green);
  }
  > div {
    margin-left: 20px;
  }
  img {
    position: relative;
    top: -5rem;
  }
`;

const UserReviewSection = styled.div`
  margin: 2rem 10%;

  h1 {
    color: var(--main-green);
    margin-bottom: 0;
  }
`;

const SectionBreak = styled.hr`
  border-top: .5px solid var(--main-green);
  border-bottom: .5px solid var(--main-green);
  margin: 0;
  margin-bottom: 5px;
`;