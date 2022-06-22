<template>
  <div>
    <NAppHeader>
      <h1>Blog</h1>
      <p>Publication &raquo; Blog &raquo; Lists</p>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <PublicationBlogList
          @row-tap="onRowTap"
          @create="onCreate"
          @delete="onDelete"
        />
      </NPanel>
    </NAppMain>
  </div>
</template>

<script>
import { defineComponent, useRouter, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  meta: {
    accessName: ['admin'],
  },
  setup() {
    const router = useRouter()

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

    const onRowTap = (row) => {
      router.push(`/publication/blog/${row.id}/edit#overview`)
    }

    const onCreate = () => {
      router.push('/publication/blog/create#overview')
    }

    const onDelete = (rows) => {}

    return {
      tabs,
      onRowTap,
      onCreate,
      onDelete,
    }
  },
})
</script>
