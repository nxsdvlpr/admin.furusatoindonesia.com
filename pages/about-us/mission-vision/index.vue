<template>
  <div>
    <NAppHeader>
      <h1>Mission and Vision</h1>
      <p>About Us &raquo; Mission and Vision &raquo; Lists</p>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <AboutUsMissionVisionList
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
      router.push(`/about-us/mission-vision/${row.id}/edit#overview`)
    }

    const onCreate = () => {
      router.push('/about-us/mission-vision/create#overview')
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
