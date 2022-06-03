import { gql } from 'graphql-tag'

export const CHANGE_MISSION_VISION_SEQUENCE = gql`
  mutation changeSequenceMissionVision(
    $id: ID!
    $group: String!
    $direction: String!
  ) {
    changeSequenceArticle(id: $id, group: $group, direction: $direction) {
      id
      sequence
    }
  }
`
