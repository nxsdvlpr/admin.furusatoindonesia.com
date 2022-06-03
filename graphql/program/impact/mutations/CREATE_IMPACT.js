import { gql } from 'graphql-tag'

export const CREATE_IMPACT = gql`
  mutation createImpact($input: CreateArticleInput!) {
    createArticle(input: $input) {
      id
    }
  }
`
