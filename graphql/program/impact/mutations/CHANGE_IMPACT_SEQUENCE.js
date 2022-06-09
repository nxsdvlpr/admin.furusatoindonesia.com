import { gql } from 'graphql-tag'

export const CHANGE_IMPACT_SEQUENCE = gql`
  mutation changeSequenceImpact(
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
