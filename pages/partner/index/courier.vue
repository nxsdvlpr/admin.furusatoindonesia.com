<template>
  <NPanel>
    <PartnerListByType
      type="COURIER"
      @row-tap="onRowTap"
      @create="onCreate"
      @delete="onDelete"
    />
  </NPanel>
</template>

<script>
import { defineComponent, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const router = useRouter()

    const onRowTap = (row) => {
      router.push(`/partner/courier/${row.id}/edit#overview`)
    }

    const onCreate = () => {
      router.push('/partner/courier/create#overview')
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
