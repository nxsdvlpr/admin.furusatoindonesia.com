<template>
  <NCounterWidget :options="widgetOptions" />
</template>

<script>
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import { useQuery } from '@vue/apollo-composable'
import { GET_TOTAL_PUBLISHED_BLOG } from '@/graphql/dashboard/queries/GET_TOTAL_PUBLISHED_BLOG'

export default defineComponent({
  setup() {
    const { onResult } = useQuery(GET_TOTAL_PUBLISHED_BLOG)

    const widgetOptions = reactive({
      title: 'Total Published Blog',
      counter: 0,
      counterChange: false,
    })

    onResult(({ data }) => {
      widgetOptions.counter = data.blogAggregate[0].count.id
    })

    return {
      widgetOptions,
    }
  },
})
</script>
