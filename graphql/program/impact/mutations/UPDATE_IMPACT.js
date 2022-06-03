import { gql } from 'graphql-tag'

export const UPDATE_IMPACT = gql`
  mutation updateImpact($input: UpdateArticleInput!) {
    updateArticle(input: $input) {
      id
    }
  }
`
