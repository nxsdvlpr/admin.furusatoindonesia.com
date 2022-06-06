import { gql } from 'graphql-tag'

export const CHANGE_ORGANIZATION_MEMBER_SEQUENCE = gql`
  mutation changeSequenceOrganizationMember(
    $id: ID!
    $organizationId: ID!
    $direction: String!
  ) {
    changeSequenceOrganizationMember(
      id: $id
      organizationStructureId: $organizationId
      direction: $direction
    ) {
      id
      sequence
    }
  }
`
