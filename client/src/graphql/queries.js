import {gql} from 'apollo-boost'

export const loginQuery = gql`
  query($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      firstName
      lastName
      email
      token
    }
  }
`