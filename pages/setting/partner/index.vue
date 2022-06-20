<template>
  <div>
    <NAppHeader>
      <h1>Partner</h1>
      <p>Setting &raquo; Partner &raquo; Lists</p>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <SettingPartnerList
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
      router.push(`/setting/partner/${row.id}/edit#overview`)
    }

    const onCreate = () => {
      router.push('/setting/partner/create#overview')
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
