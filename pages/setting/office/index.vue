<template>
  <div>
    <NAppHeader>
      <h1>Office</h1>
      <p>Setting &raquo; Office &raquo; Lists</p>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <SettingOfficeList
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
    accessName: ['admin'],
  },
  setup() {
    const router = useRouter()

    const onRowTap = (row) => {
      router.push(`/setting/office/${row.id}/edit#overview`)
    }

    const onCreate = () => {
      router.push('/setting/office/create#overview')
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
