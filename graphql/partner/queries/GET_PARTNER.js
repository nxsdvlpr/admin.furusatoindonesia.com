import { gql } from 'graphql-tag'

export const GET_PARTNER = gql`
  query getPartner($id: ID!) {
    partner(id: $id) {
      id
      name
      email
      phone
      address
      type
    }
  }
`
