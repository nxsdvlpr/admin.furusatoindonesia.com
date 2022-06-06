<template>
  <div>
    <NAppHeader>
      <h1>Testimony</h1>
      <p>Setting &raquo; Testimony &raquo; Lists</p>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <SettingTestimonyList
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
      router.push(`/setting/testimony/${row.id}/edit#overview`)
    }

    const onCreate = () => {
      router.push('/setting/testimony/create#overview')
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
