import { gql } from 'graphql-tag'

export const GET_ESTORE = gql`
  query getEstore($id: ID!) {
    user(id: $id) {
      id
      name
      phone
      username
    }
  }
`
