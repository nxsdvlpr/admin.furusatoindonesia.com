import { gql } from 'graphql-tag'

export const UPDATE_ORGANIZATION_MEMBER = gql`
  mutation updateOrganizationMember($input: UpdateOrganizationMemberInput!) {
    updateOrganizationMember(input: $input) {
      id
    }
  }
`
