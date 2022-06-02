<template>
  <div>
    <NAppHeader>
      <h1>Expertise</h1>
      <p>Expertise &raquo; Lists</p>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <ProgramExpertiseList
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
      router.push(`/program/expertise/${row.id}/edit#overview`)
    }

    const onCreate = () => {
      router.push('/program/expertise/create#overview')
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
