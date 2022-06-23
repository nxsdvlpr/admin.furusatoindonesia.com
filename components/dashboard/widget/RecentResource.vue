<template>
  <NWidget title="Recent Resources">
    <ResourceRecentList :lists="lists" />
  </NWidget>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'
import { GET_RECENT_RESOURCES } from '@/graphql/dashboard/queries/GET_RECENT_RESOURCES'

export default defineComponent({
  setup(props, { emit }) {
    const { result } = useQuery(GET_RECENT_RESOURCES, {
      fetchPolicy: 'network-only',
    })

    const lists = useResult(result, [], (data) =>
      data.resources.edges.map(({ node }) => node)
    )

    return {
      lists,
    }
  },
})
</script>
