import { gql } from 'graphql-tag'

export const CREATE_ESTORE = gql`
  mutation createEstore($input: CreateOneUserInput!) {
    createOneUser(input: $input) {
      id
    }
  }
`
