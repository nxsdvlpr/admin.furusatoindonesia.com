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
    accessName: ['admin'],
  },
  setup() {
    const tabs = ref([
      {
        name: 'Home',
        to: '/setting/pages/home',
      },
    ])

    return {
      tabs,
    }
  },
})
</script>
