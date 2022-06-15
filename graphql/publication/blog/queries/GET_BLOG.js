import { gql } from 'graphql-tag'

export const GET_BLOG = gql`
  query getBlog($id: ID!) {
    blog(id: $id) {
      id
      slug
      subject
      subjectJa
      excerpt
      excerptJa
      body
      bodyJa
      image
      published
      publishedAt
    }
  }
`
