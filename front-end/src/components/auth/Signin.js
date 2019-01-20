import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import Error from '../utils/Error';
import { CurrentUserQuery } from './User'

const SigninUser = gql`
  mutation($username: String!, $password: String!) {
    signin(username: $username, password: $password) {
      _id
      username
      email
    }
  }
`;

const initialState = {
  username: null,
  email: null,
  password: null,
  confirmPassword: null,
  errorMessage: null
}

 class Signin extends Component {
   state = {
    ...initialState
   }
   handleChange = (e) => {
     const {name, value } = e.target;
     this.setState({[name]: value});
   }
   handleSubmit = async (e, signin) => {
     e.preventDefault();
     await this.setState({errorMessage: null})
    const validPassword = this.state.password === this.state.confirmPassword && this.state.password !== null;
    const validUsername = this.state.username !== null;
    const validForm = validUsername && validPassword;
    if(!validUsername) {
      this.setState({errorMessage: "Please Provide a Username"})
    } else if(!validPassword){
      this.setState({errorMessage: "Passwords Do Not Match"})
    } else if(validForm){
      signin().then(async ({ data }) =>{
        const userId = await data._id;
        this.props.history.push(`/user/${userId}`);
      });
    }
   }
  render() {
    const { username, password, errorMessage } = this.state;
    return (
      <Mutation mutation={SigninUser} variables={{username, password}} refetchQueries={[{query: CurrentUserQuery}]}>
      {(signin, {error, loading}) => {
        return(
            <FormDiv>
            <h1>Sign In</h1>
              <form method="post" onSubmit={e => this.handleSubmit(e, signin)}>
                <input type="text" name="username" placeholder="username" onChange={this.handleChange}/><br />
                <input type="password" name="password" placeholder="password" onChange={this.handleChange}/><br />
                <input type="password" name="confirmPassword" placeholder="confirmPassword" onChange={this.handleChange}/><br />
                <button>Sign{loading ? 'ing' : ""} up</button>
                {errorMessage !== null && <Error error={this.state.errorMessage} />}
                {error && <Error error={error.message} />}
              </form>
            </FormDiv>
          )
        }
      }
      </Mutation>
    )
  }
}
export default withRouter(Signin);

const FormDiv = styled.div`
  text-align: center
`;