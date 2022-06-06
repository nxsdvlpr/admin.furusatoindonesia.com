import { gql } from 'graphql-tag'

export const UPDATE_TESTIMONY = gql`
  mutation updateTestimony($input: UpdateTestimonyInput!) {
    updateTestimony(input: $input) {
      id
    }
  }
`
