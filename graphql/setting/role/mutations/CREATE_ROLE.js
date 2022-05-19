import { gql } from 'graphql-tag'

export const CREATE_ROLE = gql`
  mutation createRole($input: CreateOneRoleInput!) {
    createOneRole(input: $input) {
      id
    }
  }
`
