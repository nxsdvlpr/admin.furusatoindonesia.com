<template>
  <div>
    <NAppHeader>
      <h1>Resource</h1>
      <p>Resource &raquo; Lists</p>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <ResourceList
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
      router.push(`/resource/${row.id}/edit#overview`)
    }

    const onCreate = () => {
      router.push('/resource/create#overview')
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
