import { gql } from 'graphql-tag'

export const GET_ORGANIZATION_PEOPLE = gql`
  query getOrganizationPeople($id: ID!) {
    organizationPeople(id: $id) {
      id
      subject
      description
      sequence
    }
  }
`
