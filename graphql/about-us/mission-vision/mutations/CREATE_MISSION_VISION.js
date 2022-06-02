import { gql } from 'graphql-tag'

export const CREATE_MISSION_VISION = gql`
  mutation createMissionVision($input: CreateArticleInput!) {
    createArticle(input: $input) {
      id
    }
  }
`
