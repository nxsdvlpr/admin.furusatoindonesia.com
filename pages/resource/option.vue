<template>
  <div>
    <NAppHeader>
      <h1>Resource</h1>
      <p>Resource &raquo; Option</p>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <ResourceFormOption
          @row-tap="onRowTap"
          @create="onCreate"
          @delete="onDelete"
        />
      </NPanel>
    </NAppMain>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
export default defineComponent({
  meta: {
    roleGuard: ['admin'],
  },
  setup() {
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

    return {
      tabs,
    }
  },
})
</script>
