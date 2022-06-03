import { gql } from 'graphql-tag'

export const GET_IMPACT = gql`
  query getImpact($id: ID!) {
    article(id: $id) {
      id
      group
      subject
      subjectJp
      excerpt
      excerptJp
      body
      bodyJp
      image
      sequence
    }
  }
`
