import { gql } from 'graphql-tag'

export const CREATE_PARTNER = gql`
  mutation createPartner($input: CreateArticleInput!) {
    createArticle(input: $input) {
      id
    }
  }
`
