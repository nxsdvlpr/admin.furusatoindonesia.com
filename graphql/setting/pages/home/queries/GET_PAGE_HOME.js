import { gql } from 'graphql-tag'

export const GET_PAGE_HOME = gql`
  query getPageHome($id: ID!) {
    article(id: $id) {
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
`
