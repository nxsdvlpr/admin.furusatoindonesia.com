<template>
  <div>
    <NAppHeader>
      <h1>Mission and Vision</h1>
      <p>About Us &raquo; Mission and Vision &raquo; Option</p>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <AboutUsMissionVisionFormOption />
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
        name: 'List',
        to: '/about-us/mission-vision/',
      },
      {
        name: 'Option',
        to: '/about-us/mission-vision/option',
      },
    ])

    return {
      tabs,
    }
  },
})
</script>
