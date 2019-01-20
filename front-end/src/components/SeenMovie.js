import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CurrentUserQuery } from './auth/User';
import { GetAllMovies } from './MovieDetail';

const UserSeenMovie =  gql`
    mutation($title: String! $username: String!){
        seenMovie(title: $title, username: $username){
            movieDBId
        }
    }
`;

const AddMovie = gql`
    mutation($title: String!, $movieDBId: Int!, $posterPath: String!){
        addMovie(title: $title, movieDBId: $movieDBId, posterPath: $posterPath){
            title
            posterPath
            movieDBId
        }
    }
`;

const SeenMovie = ({movie, user}) => {
    const movieSeen = async (addMovie, seenMovie) => {
        await addMovie();
        await seenMovie();
    }
  return (
    <Mutation 
    mutation={AddMovie}
    variables={{title: movie.title, movieDBId: movie.id, posterPath: movie.poster_path}}
    refetchQueries={[{query: GetAllMovies}]}
    >
        {(addMovie) => (
            <Mutation 
            mutation={UserSeenMovie}
            variables={{title: movie.title, username: user.username}}
            refetchQueries={[{query: CurrentUserQuery}]}
            >
                {(seenMovie) =>(
                    <button onClick={() => movieSeen(addMovie, seenMovie)}>
                        Ive Seen it!!
                    </button>
                )}
            </Mutation>
        )}
    </Mutation>
  )
}

export default SeenMovie;