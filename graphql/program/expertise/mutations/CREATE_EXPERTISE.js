import { gql } from 'graphql-tag'

export const CREATE_EXPERTISE = gql`
  mutation createExpertise($input: CreateArticleInput!) {
    createArticle(input: $input) {
      id
    }
  }
`
