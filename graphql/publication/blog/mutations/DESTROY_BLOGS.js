import { gql } from 'graphql-tag'

export const DESTROY_BLOGS = gql`
  mutation destroyBlogs($ids: [ID!]!) {
    deleteManyBlogs(input: { filter: { id: { in: $ids } } }) {
      deletedCount
    }
  }
`
