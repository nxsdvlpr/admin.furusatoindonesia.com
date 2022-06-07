<template>
  <div>
    <NAppHeader>
      <h1>At A Glance</h1>
      <p>About &raquo; At A Glance &raquo; Option</p>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <AboutUsAtAGlanceFormSection
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
        name: 'Section',
        to: '/program/work-with-us/section',
      },
      {
        name: 'Option',
        to: '/program/work-with-us/option',
      },
    ])

    return {
      tabs,
    }
  },
})
</script>
