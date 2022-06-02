import { gql } from 'graphql-tag'

export const DESTROY_RESOURCES = gql`
  mutation destroyResources($ids: [ID!]!) {
    deleteManyResources(input: { filter: { id: { in: $ids } } }) {
      deletedCount
    }
  }
`
