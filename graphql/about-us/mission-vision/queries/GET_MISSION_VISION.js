import { gql } from 'graphql-tag'

export const GET_MISSION_VISION = gql`
  query getMissionVision($id: ID!) {
    article(id: $id) {
      id
      group
      subject
      subjectJp
      excerpt
      excerptJp
      body
      bodyJp
      image
      sequence
    }
  }
`
