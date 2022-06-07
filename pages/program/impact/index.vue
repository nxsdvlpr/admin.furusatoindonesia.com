<template>
  <div>
    <NAppHeader>
      <h1>Impact</h1>
      <p>Program &raquo; Impact &raquo; Lists</p>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
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
import { defineComponent, useRouter, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  meta: {
    roleGuard: ['admin'],
  },
  setup() {
    const router = useRouter()

    const tabs = ref([
      {
        name: 'List',
        to: '/program/impact/',
      },
      {
        name: 'Option',
        to: '/program/impact/option',
      },
    ])

    const onRowTap = (row) => {
      router.push(`/program/impact/${row.id}/edit#overview`)
    }

    const onCreate = () => {
      router.push('/program/impact/create#overview')
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
