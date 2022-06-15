import { gql } from 'graphql-tag'

export const GET_ORGANIZATION_STRUCTURE = gql`
  query getOrganizationStructure($id: ID!) {
    organizationStructure(id: $id) {
      id
      subject
      subjectJa
      description
      descriptionJa
      sequence
    }
  }
`
