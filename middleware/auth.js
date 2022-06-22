import { floor } from 'lodash'
import __ from '@/lib/helper'
import { GET_ME } from '@/graphql/auth/GET_ME'

export default async function ({ app, $toast, route, error, store, redirect }) {
  const token = await app.$apolloHelpers.getToken()
  const hasToken = !!token

  const destination = route.fullPath

  if (!hasToken) {
    return redirect('/auth/login?redirect=' + destination)
  }

  const rawToken = __.parseJwt(token)

  const now = floor(new Date().getTime() / 1000)

  if (rawToken.exp < now) {
    try {
      $toast.warning('Session is expired, Please signin again.')

      return redirect('/auth/logout')
    } catch (e) {
      console.error(e)
    }
  }

  try {
    const isAuthenticated = store.getters['auth/isAuthenticated']

    if (!isAuthenticated && route.name !== 'auth-logout') {
      const client = app.apolloProvider.clients.defaultClient

      const response = await client
        .query({ query: GET_ME })
        .then(({ data }) => data && data.me)

      if (!response.username) {
        return redirect('/auth/login?redirect=' + destination)
      }

      __.parseIdsToInt(response, ['id'])

      const { __typename, ...me } = response

      store.dispatch('auth/setMe', me)

      store.dispatch('auth/setMe', me)
      store.dispatch('menus/setMenus', me.role)

      store.dispatch('auth/isAuthenticated', true)
    }

    const hasAccessName = route.meta.findIndex((m) =>
      Object.prototype.hasOwnProperty.call(m, 'accessName')
    )

    const accessName = route?.meta[hasAccessName]?.accessName

    if (typeof accessName === 'string') {
      const me = store.getters['auth/me']

      const accesses = Object.entries(me.role.access)

      const hasAccess = accesses.find((i) => i[0] === accessName && i[1])

      if (!hasAccess) {
        return error({
          message: "You don't have permission to access this page",
          statusCode: 403,
        })
      }
    }
  } catch (e) {
    console.log(e)
  }
}
