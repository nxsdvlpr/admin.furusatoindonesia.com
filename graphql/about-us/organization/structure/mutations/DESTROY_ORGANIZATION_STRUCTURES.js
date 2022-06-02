import { gql } from 'graphql-tag'

export const DESTROY_ORGANIZATION_STRUCTURES = gql`
  mutation destroyOrganizationStructures($ids: [ID!]!) {
    deleteManyOrganizationStructures(input: { filter: { id: { in: $ids } } }) {
      deletedCount
    }
  }
`
