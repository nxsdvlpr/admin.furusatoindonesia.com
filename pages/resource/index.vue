<template>
  <div>
    <NAppHeader>
      <h1>Resource</h1>
      <p>Resource &raquo; Lists</p>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
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
        to: '/resource/',
      },
      {
        name: 'Option',
        to: '/resource/option',
      },
    ])

    const onRowTap = (row) => {
      router.push(`/resource/${row.id}/edit#overview`)
    }

    const onCreate = () => {
      router.push('/resource/create#overview')
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
