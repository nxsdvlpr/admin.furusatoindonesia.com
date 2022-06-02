<template>
  <div>
    <NAppHeader>
      <h1>{{ article.subject }}</h1>
      Project &raquo; Detail Project
      <template slot="more">
        <NButton class="outline" @click="$router.push('/program/project')"
          >&laquo; PROJECTS</NButton
        >
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <ProgramProjectFormEdit @save="onSave" @discard="onDiscard" />
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
import { GET_PROJECT } from '@/graphql/program/project/queries/GET_PROJECT'

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
      router.push('/program/project')
    }

    const onDiscard = () => {
      router.push('/program/project')
    }

    const { result } = useQuery(GET_PROJECT, {
      id: route.value.params.project_id,
    })

    const article = useResult(result, {}, (data) => {
      return data.article
    })

    return {
      tabs,
      article,
      onSave,
      onDiscard,
    }
  },
})
</script>
