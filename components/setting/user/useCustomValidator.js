import { useContext } from '@nuxtjs/composition-api'
import { gql } from 'graphql-tag'
import * as validators from '@vuelidate/validators'

export default function useCustomValidator() {
  const {
    app: {
      apolloProvider: { defaultClient: clients },
    },
  } = useContext()

  const custom = {}

  const validateUsername = (value) => {
    if (
      value === '' ||
      !validators.required.$validator(value) ||
      !validators.minLength(3).$validator(value) ||
      !custom.validUsername.$validator(value)
    ) {
      return false
    }

    return true
  }

  custom.validUsername = {
    $validator: (value) => {
      // if (value.search(/^[a-zA-Z0-9-_@.]+$/) === -1) {
      //   return false
      // }

      if (value.search(/^[\S]+$/) === -1) {
        return false
      }

      return true
    },
    // $message: 'Value only acepts alphanumeric, dash and underscore',
    $message: 'Value can not contain whitespaces',
    $params: {
      type: 'validUsername',
    },
  }

  custom.uniqueUsername = {
    $validator: (value) => {
      if (!validateUsername(value)) {
        return true
      }

      return new Promise((resolve, reject) => {
        const query = gql`
          query usernameExists($username: String!) {
            usernameExists(username: $username)
          }
        `

        clients
          .query({
            query,
            variables: {
              username: value,
            },
          })
          .then(({ data }) => {
            resolve(!data.usernameExists)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    $message: 'The username is already exists',
    $params: {
      type: 'uniqueUsername',
    },
    $async: true,
    $watchTargets: [],
  }

  return custom
}
