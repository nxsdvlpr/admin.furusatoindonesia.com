<template>
  <div>
    <NAppHeader>
      <h1>User Management</h1>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <nuxt-child />
    </NAppMain>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  meta: {
    roleGuard: ['admin'],
  },
  setup() {
    const tabs = ref([
      {
        name: 'Users',
        to: `/setting/user/`,
      },
      {
        name: 'Roles',
        to: '/setting/user/role',
      },
    ])

    return {
      tabs,
    }
  },
})
</script>
