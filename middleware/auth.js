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
      store.dispatch('menus/setMenus', me.role.shortname)

      store.dispatch('auth/isAuthenticated', true)
    }

    const hasRoleGuard = route.meta.findIndex((m) =>
      Object.prototype.hasOwnProperty.call(m, 'roleGuard')
    )

    if (hasRoleGuard !== -1) {
      const allowedRoles = route.meta[hasRoleGuard].roleGuard

      const me = store.getters['auth/me']

      if (!allowedRoles.includes(me?.role)) {
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
