import { gql } from 'graphql-tag'

export const UPDATE_BLOG = gql`
  mutation updateBlog($input: UpdateBlogInput!) {
    updateBlog(input: $input) {
      id
    }
  }
`
