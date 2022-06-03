import { gql } from 'graphql-tag'

export const CREATE_PROJECT = gql`
  mutation createProject($input: CreateArticleInput!) {
    createArticle(input: $input) {
      id
    }
  }
`
