import { gql } from 'graphql-tag'

export const GET_ORGANIZATION_PEOPLES = gql`
  query getOrganizationPeoples(
    $paging: CursorPaging!
    $query: String
    $sorting: OrganizationPeopleSort!
    $organizationId: ID!
  ) {
    organizationPeople(
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
