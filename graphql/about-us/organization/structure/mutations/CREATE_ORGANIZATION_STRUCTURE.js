import { gql } from 'graphql-tag'

export const CREATE_ORGANIZATION_STRUCTURE = gql`
  mutation createOrganizationStructure(
    $input: CreateOrganizationStructureInput!
  ) {
    createOrganizationStructure(input: $input) {
      id
    }
  }
`
