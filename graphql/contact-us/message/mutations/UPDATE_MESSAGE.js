import { gql } from 'graphql-tag'

export const UPDATE_MESSAGE = gql`
  mutation updateMessage($input: UpdateMessageInput!) {
    updateMessage(input: $input) {
      id
    }
  }
`
