import { gql } from 'graphql-tag'

export const CREATE_ORGANIZATION_PEOPLE = gql`
  mutation createOrganizationPeople($input: CreateOrganizationPeopleInput!) {
    createOrganizationPeople(input: $input) {
      id
    }
  }
`
