import { gql } from 'graphql-tag'

export const GET_RESOURCE = gql`
  query getResource($id: ID!) {
    resource(id: $id) {
      id
      slug
      subject
      subjectJa
      excerpt
      excerptJa
      body
      bodyJa
      image
      file
      videoUrl
      published
      publishedAt
    }
  }
`
