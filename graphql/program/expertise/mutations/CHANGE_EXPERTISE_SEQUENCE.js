import { gql } from 'graphql-tag'

export const CHANGE_EXPERTISE_SEQUENCE = gql`
  mutation changeSequenceExpertise(
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
