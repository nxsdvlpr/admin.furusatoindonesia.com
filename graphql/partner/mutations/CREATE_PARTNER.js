import { gql } from 'graphql-tag'

export const CREATE_PARTNER = gql`
  mutation createPartner($input: CreateOnePartnerInput!) {
    createOnePartner(input: $input) {
      id
    }
  }
`
