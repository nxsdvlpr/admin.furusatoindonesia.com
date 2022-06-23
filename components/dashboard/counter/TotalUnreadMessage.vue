<template>
  <NCounterWidget :options="widgetOptions" />
</template>

<script>
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import { useQuery } from '@vue/apollo-composable'
import { GET_TOTAL_UNREAD_MESSAGE } from '@/graphql/dashboard/queries/GET_TOTAL_UNREAD_MESSAGE'

export default defineComponent({
  setup() {
    const { onResult } = useQuery(GET_TOTAL_UNREAD_MESSAGE)

    const widgetOptions = reactive({
      title: 'Total Unread Message',
      counter: 0,
      counterChange: false,
    })

    onResult(({ data }) => {
      widgetOptions.counter = data.messageAggregate[0].count.id
    })

    return {
      widgetOptions,
    }
  },
})
</script>
