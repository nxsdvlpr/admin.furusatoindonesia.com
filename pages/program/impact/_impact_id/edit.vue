<template>
  <div>
    <NAppHeader>
      <h1>{{ article.title }}</h1>
      <p>Program &raquo; Impact &raquo; Detail</p>
      <template slot="more">
        <NButton class="outline" @click="$router.push('/program/impact')"
          >&laquo; IMPACTS</NButton
        >
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <ProgramImpactFormEdit @save="onSave" @discard="onDiscard" />
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
import { GET_IMPACT } from '@/graphql/program/impact/queries/GET_IMPACT'

export default defineComponent({
  meta: {
    accessName: ['admin'],
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
      router.push('/program/impact')
    }

    const onDiscard = () => {
      router.push('/program/impact')
    }

    const { result } = useQuery(GET_IMPACT, {
      id: route.value.params.impact_id,
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
