<template>
  <div>
    <NAppHeader>
      <h1>Blog</h1>
      <p>Publication &raquo; Blog &raquo; Lists</p>
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
import { defineComponent, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  meta: {
    roleGuard: ['admin'],
  },
  setup() {
    const router = useRouter()

    const onRowTap = (row) => {
      router.push(`/publication/blog/${row.id}/edit#overview`)
    }

    const onCreate = () => {
      router.push('/publication/blog/create#overview')
    }

    const onDelete = (rows) => {}

    return {
      onRowTap,
      onCreate,
      onDelete,
    }
  },
})
</script>
