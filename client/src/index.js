import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import {createUploadLink} from 'apollo-upload-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
// import {setContext} from 'apollo-link-context'


import App from './App';
import reducers from './reducers';
const token = window.localStorage.getItem('token')
const link = createUploadLink({
  uri: '/graphql',
  headers: {
    authorization: token ? token : ''
  }
})


const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const middlewares = [reduxThunk];

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);
