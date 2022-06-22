<template>
  <div>
    <NAppHeader>
      <h1>At A Glance</h1>
      <p>About &raquo; At A Glance &raquo; Section</p>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <AboutUsAtAGlanceFormSection />
      </NPanel>
    </NAppMain>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
export default defineComponent({
  meta: {
    accessName: ['admin'],
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
