import { gql } from 'graphql-tag'

export const DESTROY_ORGANIZATION_PEOPLES = gql`
  mutation destroyOrganizationPeoples($ids: [ID!]!) {
    deleteManyOrganizationPeoples(input: { filter: { id: { in: $ids } } }) {
      deletedCount
    }
  }
`
