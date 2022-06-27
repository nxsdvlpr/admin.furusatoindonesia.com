import { gql } from 'graphql-tag'

export const CREATE_OFFICE = gql`
  mutation createOffice($input: CreateArticleInput!) {
    createArticle(input: $input) {
      id
    }
  }
`
