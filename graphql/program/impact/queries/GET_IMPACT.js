import { gql } from 'graphql-tag'

export const GET_IMPACT = gql`
  query getImpact($id: ID!) {
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
