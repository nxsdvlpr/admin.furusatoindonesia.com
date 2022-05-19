<template>
  <NPanel>
    <SettingUserList
      @row-tap="onRowTap"
      @delete="onDelete"
      @create="onCreate"
    />
  </NPanel>
</template>

<script>
import {
  defineComponent,
  useRouter,
  useContext,
  useMeta,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const router = useRouter()

    const { env } = useContext()

    const onRowTap = (row) => {
      router.push(`/setting/user/${row.id}/edit#overview`)
    }

    const onCreate = () => {
      router.push('/setting/user/create#overview')
    }

    const onDelete = (rows) => {}

    useMeta({
      title: `Users - ${env.appName}`,
    })

    return {
      onRowTap,
      onCreate,
      onDelete,
    }
  },
  head: {},
})
</script>
