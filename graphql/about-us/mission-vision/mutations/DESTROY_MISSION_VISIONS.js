import { gql } from 'graphql-tag'

export const DESTROY_MISSION_VISIONS = gql`
  mutation destroyMissionVisions($ids: [ID!]!) {
    deleteManyArticles(input: { filter: { id: { in: $ids } } }) {
      deletedCount
    }
  }
`
