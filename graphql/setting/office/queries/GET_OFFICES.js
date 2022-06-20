import { gql } from 'graphql-tag'

export const GET_OFFICES = gql`
  query getOffices(
    $paging: CursorPaging!
    $query: String
    $sorting: ArticleSort!
  ) {
    articles(
      paging: $paging
      filter: {
        group: { eq: "office" }
        or: [{ title: { iLike: $query } }, { subtitle: { iLike: $query } }]
      }
      sorting: [$sorting]
    ) {
      edges {
        node {
          id
          group
          title
          titleJa
          subtitle
          subtitleJa
          excerpt
          excerptJa
          body
          bodyJa
          image
          icon
          sequence
          published
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
