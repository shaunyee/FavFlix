import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import Error from '../utils/Error';
import {CurrentUserQuery} from './User';

const SignupUser = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
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

 class Signup extends Component {
   state = {
    ...initialState
   }
   handleChange = (e) => {
     const {name, value } = e.target;
     this.setState({[name]: value});
   }
   handleSubmit = async (e, register) => {
     e.preventDefault();
     await this.setState({errorMessage: null})
    const validPassword = this.state.password === this.state.confirmPassword && this.state.password !== null;
    const validUsername = this.state.username !== null;
    const validEmail = this.state.email !== null;
    const validForm = validUsername && validEmail && validPassword;
    if(!validUsername) {
      this.setState({errorMessage: "Please Provide a Username"})
    } else if(!validEmail){
      this.setState({errorMessage: "Please Provide a Valid Email Address"})
    } else if(!validPassword){
      this.setState({errorMessage: "Passwords Do Not Match"})
    } else if(validForm){
      register().then(async ({ data }) => {
        const userId = await data._id;
        this.props.history.push(`/user/${userId}`);
      });
    }
   }
  render() {
    const { username, email, password, errorMessage } = this.state;
    return (
      <Mutation mutation={SignupUser} variables={{username, email, password}} refetchQueries={[{query: CurrentUserQuery}]}>
      {(register, {error, loading}) => {
        return(
            <FormDiv>
            <h1>Sign Up</h1>
              <form method="post" onSubmit={e => this.handleSubmit(e, register)}>
                <input type="email" name="email" placeholder="email" onChange={this.handleChange}/><br />
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
export default withRouter(Signup);

const FormDiv = styled.div`
  text-align: center
`;