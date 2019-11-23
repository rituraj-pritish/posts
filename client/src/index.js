import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import App from './App';
import reducers from './reducers';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  request: operation => {
    const token = window.localStorage.getItem('token')

    operation.setContext({
      headers: {
        authorization: token ? token : ''
      }
    })
  }
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
