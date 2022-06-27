import { gql } from 'graphql-tag'

export const GET_OPTIONS = gql`
  query getOptions($paging: CursorPaging!, $section: String) {
    options(
      paging: $paging
      sorting: [{ field: id, direction: ASC }]
      filter: { name: { like: $section } }
    ) {
      edges {
        node {
          id
          name
          value
          valueJa
          type
        }
      }
    }
  }
`
