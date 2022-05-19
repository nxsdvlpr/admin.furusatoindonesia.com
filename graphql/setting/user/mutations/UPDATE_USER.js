import { gql } from 'graphql-tag'

export const UPDATE_USER = gql`
  mutation updateUser($input: UpdateOneUserInput!) {
    updateOneUser(input: $input) {
      id
    }
  }
`
