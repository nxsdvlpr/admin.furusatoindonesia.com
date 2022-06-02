<template>
  <div>
    <NAppHeader>
      <h1>Impact</h1>
      <p>Impact &raquo; Lists</p>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <ProgramImpactList
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
      router.push(`/program/impact/${row.id}/edit#overview`)
    }

    const onCreate = () => {
      router.push('/program/impact/create#overview')
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
