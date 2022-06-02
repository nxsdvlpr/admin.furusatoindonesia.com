import { gql } from 'graphql-tag'

export const UPDATE_MISSION_VISION = gql`
  mutation updateMissionVision($input: UpdateArticleInput!) {
    updateArticle(input: $input) {
      id
    }
  }
`
