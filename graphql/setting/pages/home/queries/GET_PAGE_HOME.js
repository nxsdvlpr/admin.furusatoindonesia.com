import { gql } from 'graphql-tag'

export const GET_PAGE_HOME = gql`
  query getPageHome($id: ID!) {
    article(id: $id) {
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
    }
  }
`
