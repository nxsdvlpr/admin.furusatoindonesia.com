import { gql } from 'graphql-tag'

export const UPDATE_ORGANIZATION_PEOPLE = gql`
  mutation updateOrganizationPeople($input: UpdateOrganizationPeopleInput!) {
    updateOrganizationPeople(input: $input) {
      id
    }
  }
`
