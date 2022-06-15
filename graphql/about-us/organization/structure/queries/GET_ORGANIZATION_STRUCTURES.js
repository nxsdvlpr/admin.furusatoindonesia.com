import { gql } from 'graphql-tag'

export const GET_ORGANIZATION_STRUCTURES = gql`
  query getOrganizationStructures(
    $paging: CursorPaging!
    $query: String
    $sorting: OrganizationStructureSort!
  ) {
    organizationStructures(
      paging: $paging
      filter: { or: [{ subject: { iLike: $query } }] }
      sorting: [$sorting]
    ) {
      edges {
        node {
          id
          subject
          subjectJa
          description
          descriptionJa
          sequence
        }
      }
      totalCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`
