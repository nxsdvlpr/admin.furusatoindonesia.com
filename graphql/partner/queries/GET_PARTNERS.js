import { gql } from 'graphql-tag'

export const GET_PARTNERS = gql`
  query getPartners(
    $paging: CursorPaging!
    $query: String
    $sorting: PartnerSort!
  ) {
    partnerAggregate(filter: { or: [{ name: { iLike: $query } }] }) {
      count {
        id
      }
    }
    partners(
      paging: $paging
      filter: { or: [{ name: { iLike: $query } }] }
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
