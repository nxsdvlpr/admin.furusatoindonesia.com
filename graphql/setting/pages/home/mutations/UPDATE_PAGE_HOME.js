import { gql } from 'graphql-tag'

export const UPDATE_PAGE_HOME = gql`
  mutation updatePageHome($input: UpdateArticleInput!) {
    updateArticle(input: $input) {
      id
    }
  }
`
