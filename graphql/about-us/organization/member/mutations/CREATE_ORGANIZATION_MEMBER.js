import { gql } from 'graphql-tag'

export const CREATE_ORGANIZATION_MEMBER = gql`
  mutation createOrganizationMember($input: CreateOrganizationMemberInput!) {
    createOrganizationMember(input: $input) {
      id
    }
  }
`
