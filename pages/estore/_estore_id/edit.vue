<template>
  <div>
    <NAppHeader>
      <h1>{{ estore.name }}</h1>
      Estore &raquo; Detail Estore
      <template slot="more">
        <NButton class="outline" @click="$router.push('/estore')"
          >&laquo; ESTORES</NButton
        >
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <EstoreFormEdit @save="onSave" @discard="onDiscard" />
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
import { GET_ESTORE } from '@/graphql/estore/queries/GET_ESTORE'

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
      router.push('/estore')
    }

    const onDiscard = () => {
      router.push('/estore')
    }

    const { result } = useQuery(GET_ESTORE, {
      id: route.value.params.estore_id,
    })

    const estore = useResult(result, {}, (data) => {
      return data.user
    })

    return {
      tabs,
      estore,
      onSave,
      onDiscard,
    }
  },
})
</script>
