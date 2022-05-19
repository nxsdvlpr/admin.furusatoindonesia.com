<template>
  <AuthLogin @login-success="onLoginSuccess" />
</template>

<script>
import { defineComponent, useRoute, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'auth',
  async middleware({ app, redirect }) {
    const hasToken = await !!app.$apolloHelpers.getToken()
    if (hasToken) {
      return redirect('/dashboard')
    }
  },
  setup() {
    const router = useRouter()
    const route = useRoute()

    const onLoginSuccess = () => {
      const redirect = route.value.query.redirect

      if (redirect && redirect !== '/') {
        return router.push(redirect)
      }

      router.push('/dashboard')
    }

    return {
      onLoginSuccess,
    }
  },
})
</script>
