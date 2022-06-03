import { gql } from 'graphql-tag'

export const UPDATE_EXPERTISE = gql`
  mutation updateExpertise($input: UpdateArticleInput!) {
    updateArticle(input: $input) {
      id
    }
  }
`
