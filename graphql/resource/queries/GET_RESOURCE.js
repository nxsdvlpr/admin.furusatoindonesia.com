import { gql } from 'graphql-tag'

export const GET_RESOURCE = gql`
  query getResource($id: ID!) {
    resource(id: $id) {
      id
      slug
      subject
      excerpt
      body
      published
      publishedAt
    }
  }
`
