import { gql } from 'graphql-tag'

export const CHANGE_PROJECT_SEQUENCE = gql`
  mutation changeSequenceProject(
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
