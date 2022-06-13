import { gql } from 'graphql-tag'

export const GET_MESSAGE = gql`
  query getMessage($id: ID!) {
    message(id: $id) {
      id
      fullname
      email
      phone
      body
      alreadyRead
      createdAt
    }
  }
`
