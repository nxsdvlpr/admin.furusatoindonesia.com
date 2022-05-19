import { gql } from 'graphql-tag'

export const GET_PARTNERS_BY_TYPE = gql`
  query getPartnersByType(
    $paging: CursorPaging!
    $query: String
    $sorting: PartnerSort!
    $type: PartnerType!
  ) {
    partnerAggregate(filter: { or: [{ name: { iLike: $query } }] }) {
      count {
        id
      }
    }
    partners(
      paging: $paging
      filter: { type: { eq: $type }, or: [{ name: { iLike: $query } }] }
      sorting: [$sorting]
    ) {
      edges {
        node {
          id
          name
          email
          phone
          address
          type
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`
