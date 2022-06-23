<template>
  <NCounterWidget :options="widgetOptions" />
</template>

<script>
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import { useQuery } from '@vue/apollo-composable'
import { GET_TOTAL_PUBLISHED_RESOURCE } from '@/graphql/dashboard/queries/GET_TOTAL_PUBLISHED_RESOURCE'

export default defineComponent({
  setup() {
    const { onResult } = useQuery(GET_TOTAL_PUBLISHED_RESOURCE)

    const widgetOptions = reactive({
      title: 'Total Published Resource',
      counter: 0,
      counterChange: false,
    })

    onResult(({ data }) => {
      widgetOptions.counter = data.resourceAggregate[0].count.id
    })

    return {
      widgetOptions,
    }
  },
})
</script>
