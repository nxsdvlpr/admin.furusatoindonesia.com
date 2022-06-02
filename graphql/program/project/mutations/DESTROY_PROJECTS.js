import { gql } from 'graphql-tag'

export const DESTROY_PROJECTS = gql`
  mutation destroyProjects($ids: [ID!]!) {
    deleteManyArticles(input: { filter: { id: { in: $ids } } }) {
      deletedCount
    }
  }
`
