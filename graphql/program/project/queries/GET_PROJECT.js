import { gql } from 'graphql-tag'

export const GET_PROJECT = gql`
  query getProject($id: ID!) {
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
      published
    }
  }
`
