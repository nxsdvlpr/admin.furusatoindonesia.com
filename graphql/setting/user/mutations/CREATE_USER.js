import { gql } from 'graphql-tag'

export const CREATE_USER = gql`
  mutation createUser($input: CreateOneUserInput!) {
    createOneUser(input: $input) {
      id
    }
  }
`
