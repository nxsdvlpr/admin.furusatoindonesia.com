<template>
  <div>
    <NAppHeader>
      <h1>Blog</h1>
      <p>Publication &raquo; Blog &raquo; Option</p>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <PublicationBlogFormOption />
      </NPanel>
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
        name: 'List',
        to: '/publication/blog/',
      },
      {
        name: 'Option',
        to: '/publication/blog/option',
      },
    ])

    return {
      tabs,
    }
  },
})
</script>
