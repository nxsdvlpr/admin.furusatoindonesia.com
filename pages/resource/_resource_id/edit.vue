<template>
  <div>
    <NAppHeader>
      <h1>{{ resource.subject }}</h1>
      Resource &raquo; Detail Resource
      <template slot="more">
        <NButton class="outline" @click="$router.push('/resource')"
          >&laquo; RESOURCES</NButton
        >
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <ResourceFormEdit @save="onSave" @discard="onDiscard" />
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
import { GET_RESOURCE } from '@/graphql/resource/queries/GET_RESOURCE'

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
      router.push('/resource')
    }

    const onDiscard = () => {
      router.push('/resource')
    }

    const { result } = useQuery(GET_RESOURCE, {
      id: route.value.params.resource_id,
    })

    const resource = useResult(result, {}, (data) => {
      return data.resource
    })

    return {
      tabs,
      resource,
      onSave,
      onDiscard,
    }
  },
})
</script>
