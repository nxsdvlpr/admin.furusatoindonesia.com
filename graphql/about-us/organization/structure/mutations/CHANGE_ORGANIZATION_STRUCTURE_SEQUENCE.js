import { gql } from 'graphql-tag'

export const CHANGE_ORGANIZATION_STRUCTURE_SEQUENCE = gql`
  mutation changeSequenceOrganizationStructure($id: ID!, $direction: String!) {
    changeSequenceOrganizationStructure(id: $id, direction: $direction) {
      id
      sequence
    }
  }
`
