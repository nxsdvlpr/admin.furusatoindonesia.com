import { gql } from 'graphql-tag'

export const UPDATE_PARTNER = gql`
  mutation updatePartner($input: UpdateOnePartnerInput!) {
    updateOnePartner(input: $input) {
      id
    }
  }
`
