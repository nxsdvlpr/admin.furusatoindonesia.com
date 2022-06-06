import { gql } from 'graphql-tag'

export const GET_PAGE_PROGRAM = gql`
  query getPageProgram($id: ID!) {
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
