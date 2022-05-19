import { gql } from 'graphql-tag'

export const UPDATE_ESTORE = gql`
  mutation updateEstore($input: UpdateOneUserInput!) {
    updateOneUser(input: $input) {
      id
    }
  }
`
