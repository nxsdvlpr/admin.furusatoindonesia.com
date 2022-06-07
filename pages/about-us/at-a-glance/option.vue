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
        <AboutUsAtAGlanceFormOption
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
        to: '/about-us/at-a-glance/section',
      },
      {
        name: 'Option',
        to: '/about-us/at-a-glance/option',
      },
    ])

    return {
      tabs,
    }
  },
})
</script>
