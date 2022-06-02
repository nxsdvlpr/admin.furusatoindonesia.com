import { gql } from 'graphql-tag'

export const UPDATE_ORGANIZATION_STRUCTURE = gql`
  mutation updateOrganizationStructure(
    $input: UpdateOrganizationStructureInput!
  ) {
    updateOrganizationStructure(input: $input) {
      id
    }
  }
`
