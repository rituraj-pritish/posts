import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import reducers from './redux/reducers';
import App from './components/app/App';

const token = window.localStorage.getItem('token');

const link = createUploadLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://posts-posts-posts.herokuapp.com/graphql'
      : 'http://localhost:5000/graphql',
  headers: {
    authorization: token ? token : ''
  }
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

const middlewares = [reduxThunk];

const devTools =
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(...middlewares)
    : composeWithDevTools(applyMiddleware(...middlewares));

const store = createStore(reducers, devTools);

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);
