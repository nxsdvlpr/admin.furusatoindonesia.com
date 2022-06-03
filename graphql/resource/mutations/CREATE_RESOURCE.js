import { gql } from 'graphql-tag'

export const CREATE_RESOURCE = gql`
  mutation createResource($input: CreateResourceInput!) {
    createResource(input: $input) {
      id
    }
  }
`
