import { gql } from 'graphql-tag'

export const GET_EXPERTISE = gql`
  query getExpertise($id: ID!) {
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
      published
    }
  }
`
