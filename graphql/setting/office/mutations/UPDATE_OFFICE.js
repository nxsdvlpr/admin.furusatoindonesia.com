import { gql } from 'graphql-tag'

export const UPDATE_OFFICE = gql`
  mutation updateOffice($input: UpdateArticleInput!) {
    updateArticle(input: $input) {
      id
    }
  }
`
