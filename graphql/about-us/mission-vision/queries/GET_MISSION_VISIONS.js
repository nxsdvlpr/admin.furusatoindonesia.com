import { gql } from 'graphql-tag'

export const GET_MISSION_VISIONS = gql`
  query getMissionVisions(
    $paging: CursorPaging!
    $query: String
    $sorting: ArticleSort!
  ) {
    articles(
      paging: $paging
      filter: {
        group: { eq: "mission-vision" }
        or: [{ title: { iLike: $query } }, { body: { iLike: $query } }]
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
