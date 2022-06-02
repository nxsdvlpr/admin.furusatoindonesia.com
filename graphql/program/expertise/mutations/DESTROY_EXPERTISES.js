import { gql } from 'graphql-tag'

export const DESTROY_EXPERTISES = gql`
  mutation destroyExpertises($ids: [ID!]!) {
    deleteManyArticles(input: { filter: { id: { in: $ids } } }) {
      deletedCount
    }
  }
`
