import { gql } from 'graphql-tag'

export const GET_ORGANIZATION_MEMBERS = gql`
  query getOrganizationMembers(
    $paging: CursorPaging!
    $query: String
    $sorting: OrganizationMemberSort!
    $organizationId: ID!
  ) {
    organizationMembers(
      paging: $paging
      filter: {
        organizationStructureId: { eq: $organizationId }
        or: [{ fullname: { iLike: $query } }]
      }
      sorting: [$sorting]
    ) {
      edges {
        node {
          id
          fullname
          profession
          professionJa
          image
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
