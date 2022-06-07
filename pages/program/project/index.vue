<template>
  <div>
    <NAppHeader>
      <h1>Project</h1>
      <p>Program &raquo; Project &raquo; Lists</p>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <ProgramProjectList
          @row-tap="onRowTap"
          @create="onCreate"
          @delete="onDelete"
        />
      </NPanel>
    </NAppMain>
  </div>
</template>

<script>
import { defineComponent, ref, useRouter } from '@nuxtjs/composition-api'
export default defineComponent({
  meta: {
    roleGuard: ['admin'],
  },
  setup() {
    const router = useRouter()

    const tabs = ref([
      {
        name: 'List',
        to: '/program/project/',
      },
      {
        name: 'Statistic',
        to: '/program/project/statistic',
      },
      {
        name: 'Option',
        to: '/program/project/option',
      },
    ])

    const onRowTap = (row) => {
      router.push(`/program/project/${row.id}/edit#overview`)
    }

    const onCreate = () => {
      router.push('/program/project/create#overview')
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
