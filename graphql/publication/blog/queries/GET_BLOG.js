import { gql } from 'graphql-tag'

export const GET_BLOG = gql`
  query getBlog($id: ID!) {
    blog(id: $id) {
      id
      slug
      subject
      excerpt
      body
      image
      published
      publishedAt
    }
  }
`
