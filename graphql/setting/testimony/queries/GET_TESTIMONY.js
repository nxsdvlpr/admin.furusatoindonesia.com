import { gql } from 'graphql-tag'

export const GET_TESTIMONY = gql`
  query getTestimony($id: ID!) {
    testimony(id: $id) {
      id
      fullname
      profession
      message
      avatar
      logo
    }
  }
`
