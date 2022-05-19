import { gql } from 'graphql-tag'

export const DESTROY_USERS = gql`
  mutation destroyUsers($ids: [ID!]!) {
    deleteManyUsers(input: { filter: { id: { in: $ids } } }) {
      deletedCount
    }
  }
`
