import { gql } from 'graphql-tag'

export const DESTROY_ESTORES = gql`
  mutation destroyEstores($ids: [ID!]!) {
    deleteManyUsers(input: { filter: { id: { in: $ids } } }) {
      deletedCount
    }
  }
`
