import { gql } from 'graphql-tag'

export const UPDATE_RESOURCE = gql`
  mutation updateResource($input: UpdateResourceInput!) {
    updateResource(input: $input) {
      id
    }
  }
`
