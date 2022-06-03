import { gql } from 'graphql-tag'

export const GET_OPTIONS = gql`
  query getOptions($paging: CursorPaging!) {
    options(paging: $paging) {
      edges {
        node {
          id
          name
          value
          valueJp
          type
        }
      }
    }
  }
`
