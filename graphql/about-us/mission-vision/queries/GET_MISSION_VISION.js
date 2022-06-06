import { gql } from 'graphql-tag'

export const GET_MISSION_VISION = gql`
  query getMissionVision($id: ID!) {
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
