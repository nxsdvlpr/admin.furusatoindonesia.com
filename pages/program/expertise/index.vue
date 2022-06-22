<template>
  <div>
    <NAppHeader>
      <h1>Expertise</h1>
      <p>Program &raquo; Expertise &raquo; Lists</p>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
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
        to: '/program/expertise/',
      },
      {
        name: 'Option',
        to: '/program/expertise/option',
      },
    ])

    const onRowTap = (row) => {
      router.push(`/program/expertise/${row.id}/edit#overview`)
    }

    const onCreate = () => {
      router.push('/program/expertise/create#overview')
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
