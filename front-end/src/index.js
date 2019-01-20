import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './components/App';
import MovieDetail from './components/MovieDetail';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import Nav from './components/Nav';
import Profile from './components/Profile';

const client = new ApolloClient({
    link: createHttpLink({
        uri: "http://localhost:4000/graphql",
        credentials: "include"
    }),
    cache: new InMemoryCache()
});

// const client = new ApolloClient({
//     uri: "http://localhost:4000/graphql",
//     fetchOptions: {
//         credentials: 'include'
//     }
// })

  const AppWithRoutes = () => (
    <ApolloProvider client={client}>
        <Router>
            <div>
            <Nav />
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/movie/:id" component={MovieDetail} />
                <Route path="/signup" component={Signup} />
                <Route path="/signin" component={Signin} />
                <Route path="/user/:id" component={Profile} />
                <Redirect to="/" />
            </Switch>
            </div>
        </Router>
    </ApolloProvider>
  )

ReactDOM.render(<AppWithRoutes />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
