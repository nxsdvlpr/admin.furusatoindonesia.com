import { gql } from 'graphql-tag'

export const GET_PROJECT = gql`
  query getProject($id: ID!) {
    article(id: $id) {
      id
      name
      group
      subject
      excerpt
      body
      image
      sequence
    }
  }
`
