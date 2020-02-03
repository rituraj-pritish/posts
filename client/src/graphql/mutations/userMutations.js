import { gql } from 'apollo-boost';

export const signUpMutation = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    signUp(
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

export const socialSignUpMutation = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $provider: String!
    $providerId: String!
  ) {
    socialSignUp(
      firstName: $firstName
      lastName: $lastName
      email: $email
      provider: $provider
      providerId: $providerId
    ) {
      _id
      firstName
      lastName
      email
      token
    }
  }
`;
