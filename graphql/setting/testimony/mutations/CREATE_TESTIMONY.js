import { gql } from 'graphql-tag'

export const CREATE_TESTIMONY = gql`
  mutation createTestimony($input: CreateTestimonyInput!) {
    createTestimony(input: $input) {
      id
    }
  }
`
