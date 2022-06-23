<template>
  <NWidget title="Recent Blogs">
    <ResourceRecentList :lists="lists" />
  </NWidget>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'
import { GET_RECENT_BLOGS } from '@/graphql/dashboard/queries/GET_RECENT_BLOGS'

export default defineComponent({
  setup(props, { emit }) {
    const { result } = useQuery(GET_RECENT_BLOGS, {
      fetchPolicy: 'network-only',
    })

    const lists = useResult(result, [], (data) =>
      data.blogs.edges.map(({ node }) => node)
    )

    return {
      lists,
    }
  },
})
</script>
