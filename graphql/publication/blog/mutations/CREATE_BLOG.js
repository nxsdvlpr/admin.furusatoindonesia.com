import { gql } from 'graphql-tag'

export const CREATE_BLOG = gql`
  mutation createBlog($input: CreateBlogInput!) {
    createBlog(input: $input) {
      id
    }
  }
`
