import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import User from '../components/auth/User';
import Logout from './auth/Logout';

class Nav extends Component {
    componentDidMount(){
    window.addEventListener("scroll", this.navScroll);    
    }
    componentWillUnmount() {
    window.removeEventListener("scroll", this.navScroll);
      }
     navScroll = (e) => {
        const nav = document.querySelector('nav');
        if (document.body.scrollTop >= 200 ) {
            nav.setAttribute("id", "nav-transparent");
        } 
        else {
            nav.setAttribute("id", "nav-transparent");
            nav.classList.remove("nav-colored");
        }
    }
    render(){
        return (
            <User>
            {({data: {currentUser}}, loading) => {
                if(loading) return <p>Loading</p>
                return (
                <NavBar onClick={(e) => this.navScroll(e)}>
                    <NavItems>
                        <Link to={`/`}><b>Fav Flix</b></Link>
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
}
export default Nav;

const NavBar = styled.nav`
	text-align: center;
	background-color: var(--nav-bg-color);
    box-shadow: -3px 3px 10px 0px rgba(19,32,48, 0.7);
    position: sticky;
    top: -1px;
    padding: 1rem 0;
    z-index: 1;
    a {
        color: var(--main-green);
        font-size: 1rem;
        text-transform: uppercase;
    }
    a:hover {
        color: var(--main-green-hover);
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