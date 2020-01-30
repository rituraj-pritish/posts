import { gql } from 'apollo-boost';

export const signupMutation = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      _id
      firstName
      lastName
      email
      token
    }
  }
`;