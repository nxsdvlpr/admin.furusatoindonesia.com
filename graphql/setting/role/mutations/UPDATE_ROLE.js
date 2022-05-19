import { gql } from 'graphql-tag'

export const UPDATE_ROLE = gql`
  mutation updateRole($input: UpdateOneRoleInput!) {
    updateOneRole(input: $input) {
      id
    }
  }
`
