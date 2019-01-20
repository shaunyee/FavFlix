import React, { Component } from 'react';
import styled from 'styled-components';

import MoviePoster from './MoviePoster';
import {API_KEY} from '../config';



class Movies extends Component {
    state = {
        movies: [],
        page: 1
    }
    async componentDidMount() {
        try {
          const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.state.page}`);
    
          const movies = await res.json();
          this.setState({
            movies: movies.results
          });
    
        }catch(e) {
          console.log(e);
        }
      }
      nextPage = async () => {
          await this.setState({
              page: this.state.page +1
          })
           try {
          const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.state.page}`);
    
          const movies = await res.json();
          this.setState({
            movies: movies.results
          });
    
        }catch(e) {
          console.log(e);
        }
      }
      lastPage = async() => {
        await this.setState({
            page: this.state.page -1
        })
         try {
        const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.state.page}`);
  
        const movies = await res.json();
        this.setState({
          movies: movies.results
        });
  
      }catch(e) {
        console.log(e);
        this.setState({movies: {}})
      }
      }
    render() {
        const { movies } = this.state;
        return(
            <div>
                <h1>Movies goes here</h1>
                <MovieGrid>{movies.map(movie => {
                    return(
                        <MoviePoster movie={movie} key={movie.id}/>
                    )
                })}</MovieGrid>
                {
                this.state.page !== 1 && <button onClick={this.lastPage}>&larr; last page</button>
                }
                <button onClick={this.nextPage}>next page &rarr;</button>
            </div>
        )
    }
}

export default Movies;

const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(5, 1fr);
  grid-row-gap: 1rem;
`;
