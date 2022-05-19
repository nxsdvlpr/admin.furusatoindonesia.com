<template>
  <div>
    <NAppHeader>
      <h1>Estore</h1>
      <p>Estore &raquo; Lists</p>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <EstoreList @row-tap="onRowTap" @create="onCreate" @delete="onDelete" />
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
      router.push(`/estore/${row.id}/edit#overview`)
    }

    const onCreate = () => {
      router.push('/estore/create#overview')
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
