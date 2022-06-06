<template>
  <div>
    <NAppHeader>
      <h1>{{ blog.title }}</h1>
      <p>Publication &raquo; Blog &raquo; Detail</p>
      <template slot="more">
        <NButton class="outline" @click="$router.push('/publication/blog')"
          >&laquo; BLOGS</NButton
        >
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <PublicationBlogFormEdit @save="onSave" @discard="onDiscard" />
      </NPanel>
    </NAppMain>
  </div>
</template>

<script>
import {
  defineComponent,
  useRouter,
  useRoute,
  ref,
} from '@nuxtjs/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'
import { GET_BLOG } from '@/graphql/publication/blog/queries/GET_BLOG'

export default defineComponent({
  meta: {
    roleGuard: ['admin'],
  },
  setup() {
    const router = useRouter()

    const route = useRoute()

    const tabs = ref([
      {
        name: 'Overview',
        to: '#overview',
      },
    ])

    const onSave = () => {
      router.push('/publication/blog')
    }

    const onDiscard = () => {
      router.push('/publication/blog')
    }

    const { result } = useQuery(GET_BLOG, {
      id: route.value.params.blog_id,
    })

    const blog = useResult(result, {}, (data) => {
      return data.blog
    })

    return {
      tabs,
      blog,
      onSave,
      onDiscard,
    }
  },
})
</script>
