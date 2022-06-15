import { gql } from 'graphql-tag'

export const GET_TESTIMONY = gql`
  query getTestimony($id: ID!) {
    testimony(id: $id) {
      id
      fullname
      profession
      professionJa
      message
      messageJa
      avatar
      logo
    }
  }
`
