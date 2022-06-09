import { gql } from 'graphql-tag'

export const GET_EXPERTISE = gql`
  query getExpertise($id: ID!) {
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
