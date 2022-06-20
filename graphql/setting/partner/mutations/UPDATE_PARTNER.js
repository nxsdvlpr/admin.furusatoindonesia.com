import { gql } from 'graphql-tag'

export const UPDATE_PARTNER = gql`
  mutation updatePartner($input: UpdateArticleInput!) {
    updateArticle(input: $input) {
      id
    }
  }
`
