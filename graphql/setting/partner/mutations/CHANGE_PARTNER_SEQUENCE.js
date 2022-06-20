import { gql } from 'graphql-tag'

export const CHANGE_PARTNER_SEQUENCE = gql`
  mutation changeSequencePartner(
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
