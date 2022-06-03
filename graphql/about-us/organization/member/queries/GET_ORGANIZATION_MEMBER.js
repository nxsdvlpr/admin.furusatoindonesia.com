import { gql } from 'graphql-tag'

export const GET_ORGANIZATION_MEMBER = gql`
  query getOrganizationMember($id: ID!) {
    organizationMember(id: $id) {
      id
      organizationStructureId
      fullname
      profession
      professionJp
      image
      sequence
    }
  }
`
