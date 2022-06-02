import { gql } from 'graphql-tag'

export const UPDATE_PROJECT = gql`
  mutation updateProject($input: UpdateArticleInput!) {
    updateArticle(input: $input) {
      id
    }
  }
`
