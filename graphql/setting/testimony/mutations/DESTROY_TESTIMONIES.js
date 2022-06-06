import { gql } from 'graphql-tag'

export const DESTROY_TESTIMONIES = gql`
  mutation destroyTestimonies($ids: [ID!]!) {
    deleteManyTestimonies(input: { filter: { id: { in: $ids } } }) {
      deletedCount
    }
  }
`
