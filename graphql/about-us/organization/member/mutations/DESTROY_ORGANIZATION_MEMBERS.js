import { gql } from 'graphql-tag'

export const DESTROY_ORGANIZATION_MEMBERS = gql`
  mutation destroyOrganizationMembers($ids: [ID!]!) {
    deleteManyOrganizationMembers(input: { filter: { id: { in: $ids } } }) {
      deletedCount
    }
  }
`
