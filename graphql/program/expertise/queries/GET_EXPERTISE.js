import { gql } from 'graphql-tag'

export const GET_EXPERTISE = gql`
  query getExpertise($id: ID!) {
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
