<template>
  <div>
    <NAppHeader>
      <h1>Partner</h1>
      <p>Partner &raquo; Lists</p>
      <template slot="after">
        <NTabs :min-tab-items="minTabItems" :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <nuxt-child />
    </NAppMain>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  meta: {
    roleGuard: ['admin'],
  },
  setup() {
    const tabs = ref([
      {
        name: 'All',
        to: '/partner',
      },
      {
        name: 'ACSC',
        to: '/partner/acsc',
      },
      {
        name: 'Store',
        to: '/partner/store',
      },
      {
        name: 'Courier',
        to: '/partner/courier',
      },
    ])

    const minTabItems = reactive({
      sm: 4,
      md: 5,
      lg: 5,
      xl: 6,
      '2xl': Infinity,
    })

    return {
      tabs,
      minTabItems,
    }
  },
})
</script>
