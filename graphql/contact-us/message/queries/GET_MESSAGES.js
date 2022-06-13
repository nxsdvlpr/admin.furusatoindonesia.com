import { gql } from 'graphql-tag'

export const GET_MESSAGES = gql`
  query getMessages(
    $paging: CursorPaging!
    $query: String
    $sorting: MessageSort!
  ) {
    messages(
      paging: $paging
      filter: {
        or: [{ fullname: { iLike: $query } }, { email: { iLike: $query } }]
      }
      sorting: [$sorting]
    ) {
      edges {
        node {
          id
          fullname
          email
          phone
          body
          alreadyRead
          createdAt
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
