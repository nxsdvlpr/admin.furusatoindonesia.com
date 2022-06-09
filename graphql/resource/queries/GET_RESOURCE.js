import { gql } from 'graphql-tag'

export const GET_RESOURCE = gql`
  query getResource($id: ID!) {
    resource(id: $id) {
      id
      slug
      subject
      subjectJp
      excerpt
      excerptJp
      body
      bodyJp
      published
      publishedAt
    }
  }
`
