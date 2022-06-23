import { gql } from 'graphql-tag'

export const GET_TOTAL_PUBLISHED_RESOURCE = gql`
  query totalPublishedResource {
    resourceAggregate(filter: { and: [{ published: { is: true } }] }) {
      count {
        id
      }
    }
  }
`
