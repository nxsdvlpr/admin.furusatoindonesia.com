import { gql } from 'graphql-tag'

export const GET_PAGE_PROGRAM = gql`
  query getPageProgram($id: ID!) {
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
      counter
      sequence
    }
  }
`
