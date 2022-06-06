<template>
  <div>
    <NAppHeader>
      <h1>Pages Setting</h1>
      <p>Setting &raquo; Pages</p>
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
        name: 'Home',
        to: '/setting/pages/home',
      },
      {
        name: 'Programs',
        to: '/setting/pages/programs',
      },
      {
        name: 'Publications',
        to: '/setting/pages/publications',
      },
      {
        name: 'Resources',
        to: '/setting/pages/resources',
      },
    ])

    return {
      tabs,
    }
  },
})
</script>
