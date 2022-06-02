<template>
  <div>
    <NAppHeader>
      <h1>{{ article.subject }}</h1>
      Mission and Vision &raquo; Detail Mission and Vision
      <template slot="more">
        <NButton
          class="outline"
          @click="$router.push('/about-us/mission-vision')"
          >&laquo; MISSION VISIONS</NButton
        >
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <AboutUsMissionVisionFormEdit @save="onSave" @discard="onDiscard" />
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
import { GET_MISSION_VISION } from '@/graphql/about-us/mission-vision/queries/GET_MISSION_VISION'

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
      router.push('/about-us/mission-vision')
    }

    const onDiscard = () => {
      router.push('/about-us/mission-vision')
    }

    const { result } = useQuery(GET_MISSION_VISION, {
      id: route.value.params.mission_id,
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
