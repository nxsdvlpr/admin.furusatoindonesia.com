import { gql } from 'graphql-tag'

export const DESTROY_ROLES = gql`
  mutation destroyRoles($ids: [ID!]!) {
    deleteManyRoles(input: { filter: { id: { in: $ids } } }) {
      deletedCount
    }
  }
`
