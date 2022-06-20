import { gql } from 'graphql-tag'

export const CHANGE_OFFICE_SEQUENCE = gql`
  mutation changeSequenceOffice(
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
