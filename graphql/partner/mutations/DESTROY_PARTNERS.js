import { gql } from 'graphql-tag'

export const DESTROY_PARTNERS = gql`
  mutation destroyPartners($ids: [ID!]!) {
    deleteManyPartners(input: { filter: { id: { in: $ids } } }) {
      deletedCount
    }
  }
`
