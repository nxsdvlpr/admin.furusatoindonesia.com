<template>
  <div>
    <NAppHeader>
      <h1>Mission and Vision</h1>
      <p>About Us &raquo; Mission and Vision &raquo; Lists</p>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
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
        to: '/about-us/mission-vision/',
      },
      {
        name: 'Option',
        to: '/about-us/mission-vision/option',
      },
    ])

    const onRowTap = (row) => {
      router.push(`/about-us/mission-vision/${row.id}/edit#overview`)
    }

    const onCreate = () => {
      router.push('/about-us/mission-vision/create#overview')
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
