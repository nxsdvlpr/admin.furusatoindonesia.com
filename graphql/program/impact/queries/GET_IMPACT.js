import { gql } from 'graphql-tag'

export const GET_IMPACT = gql`
  query getImpact($id: ID!) {
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
