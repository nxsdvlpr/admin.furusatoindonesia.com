import { gql } from 'graphql-tag'

export const GET_IMPACTS = gql`
  query getImpacts(
    $paging: CursorPaging!
    $query: String
    $sorting: ArticleSort!
  ) {
    articles(
      paging: $paging
      filter: {
        group: { eq: "impact" }
        or: [{ title: { iLike: $query } }, { subtitle: { iLike: $query } }]
      }
      sorting: [$sorting]
    ) {
      edges {
        node {
          id
          group
          title
          titleJp
          subtitle
          subtitleJp
          excerpt
          excerptJp
          body
          bodyJp
          image
          icon
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
