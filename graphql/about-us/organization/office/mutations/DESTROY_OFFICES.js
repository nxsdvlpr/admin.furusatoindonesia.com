import { gql } from 'graphql-tag'

export const DESTROY_OFFICES = gql`
  mutation destroyOffices($ids: [ID!]!) {
    deleteManyArticles(input: { filter: { id: { in: $ids } } }) {
      deletedCount
    }
  }
`
