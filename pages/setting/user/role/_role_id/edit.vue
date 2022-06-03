<template>
  <div>
    <NAppHeader>
      <h1>{{ role.name }}</h1>
      Role &raquo; Detail Role
      <template slot="more">
        <NButton class="outline" @click="$router.push('/setting/user/role')"
          >&laquo; ROLES</NButton
        >
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <SettingRoleFormEdit @save="onSave" @discard="onDiscard" />
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
import { GET_ROLE } from '@/graphql/setting/role/queries/GET_ROLE'

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
      {
        name: 'Role Access',
        to: '#role-access',
      },
    ])

    const onSave = () => {
      router.push('/setting/user/role')
    }

    const onDiscard = () => {
      router.push('/setting/user/role')
    }

    const { result } = useQuery(GET_ROLE, {
      id: route.value.params.role_id,
    })

    const role = useResult(result, {}, (data) => {
      return data.role
    })

    return {
      tabs,
      role,
      onSave,
      onDiscard,
    }
  },
})
</script>
