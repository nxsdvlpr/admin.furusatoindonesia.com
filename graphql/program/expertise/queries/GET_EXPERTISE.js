import { gql } from 'graphql-tag'

export const GET_EXPERTISE = gql`
  query getExpertise($id: ID!) {
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
