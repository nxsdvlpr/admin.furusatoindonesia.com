import { gql } from 'graphql-tag'

export const DESTROY_IMPACTS = gql`
  mutation destroyImpacts($ids: [ID!]!) {
    deleteManyArticles(input: { filter: { id: { in: $ids } } }) {
      deletedCount
    }
  }
`
