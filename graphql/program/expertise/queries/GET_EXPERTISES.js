import { gql } from 'graphql-tag'

export const GET_EXPERTISES = gql`
  query getExpertises(
    $paging: CursorPaging!
    $query: String
    $sorting: ArticleSort!
  ) {
    articles(
      paging: $paging
      filter: {
        group: { eq: "expertise" }
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
