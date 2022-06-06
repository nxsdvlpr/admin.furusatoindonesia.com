import { gql } from 'graphql-tag'

export const UPDATE_PAGE_PROGRAM = gql`
  mutation updatePageProgram($input: UpdateArticleInput!) {
    updateArticle(input: $input) {
      id
    }
  }
`
