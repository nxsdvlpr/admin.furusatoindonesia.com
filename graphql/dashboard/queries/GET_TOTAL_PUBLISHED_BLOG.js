import { gql } from 'graphql-tag'

export const GET_TOTAL_PUBLISHED_BLOG = gql`
  query totalPublishedBlog {
    blogAggregate(filter: { and: [{ published: { is: true } }] }) {
      count {
        id
      }
    }
  }
`
