import { gql } from 'graphql-tag'

export const GET_PROJECT = gql`
  query getProject($id: ID!) {
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
