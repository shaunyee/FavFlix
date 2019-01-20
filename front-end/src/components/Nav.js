import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import User from '../components/auth/User';
import Logout from './auth/Logout';

export default function Nav() {
  return (
      <User>
      {({data: {currentUser}}, loading) => {
          if(loading) return <p>Loading</p>
          return (
        <NavBar>
            <NavItems>
                <Link to={`/`}>Home</Link>
                {!currentUser && (
                    <Fragment>
                        <Link to={`/signup`}>Sign Up</Link>
                        <Link to={`/signin`}>Sign In</Link>
                    </Fragment>
                )}
                {currentUser && (
                    <Fragment>
                        <Link to={`/user/${currentUser._id}`}>Profile</Link>
                        <Logout />
                    </Fragment>
                )}
            </NavItems>
        </NavBar>
          )
      }}
      </User>
  )
}

const NavBar = styled.nav`
	text-align: center;
	background-color: var(--nav-bg-color);
    box-shadow: -3px 3px 10px 0px rgba(19,32,48, 0.7);
    position: sticky;
    top: -1px;
    padding: 1rem 0;
    a {
        color: var(--main-green);
        font-size: 1rem;
        text-transform: uppercase;
    }
`;

const NavItems = styled.ul`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
    flex-wrap: wrap;
    margin-top: 0;
    margin-bottom: 0;
`;