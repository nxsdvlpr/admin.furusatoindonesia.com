<template>
  <div>
    <NAppHeader>
      <h1>At A Glance</h1>
      <p>About &raquo; At A Glance</p>
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
        name: 'Page Header',
        to: '/about-us/at-a-glance#page-header',
      },
      {
        name: 'Intro',
        to: '/about-us/at-a-glance#intro',
      },
      {
        name: 'Group Chart',
        to: '/about-us/at-a-glance#group-chart',
      },
      {
        name: 'Philosophy',
        to: '/about-us/at-a-glance#philosophy',
      },
    ])

    return {
      tabs,
    }
  },
})
</script>
