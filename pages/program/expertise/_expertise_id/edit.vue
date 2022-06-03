<template>
  <div>
    <NAppHeader>
      <h1>{{ article.subject }}</h1>
      <p>Program &raquo; Expertise &raquo; Detail</p>
      <template slot="more">
        <NButton class="outline" @click="$router.push('/program/expertise')"
          >&laquo; EXPERTISES</NButton
        >
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <ProgramExpertiseFormEdit @save="onSave" @discard="onDiscard" />
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
import { GET_EXPERTISE } from '@/graphql/program/expertise/queries/GET_EXPERTISE'

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
      router.push('/program/expertise')
    }

    const onDiscard = () => {
      router.push('/program/expertise')
    }

    const { result } = useQuery(GET_EXPERTISE, {
      id: route.value.params.expertise_id,
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
