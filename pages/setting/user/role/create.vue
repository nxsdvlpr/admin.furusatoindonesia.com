<template>
  <div>
    <NAppHeader>
      <h1>Role</h1>
      <p>Role &raquo; Create Role</p>
      <template slot="more">
        <NButtonGroup>
          <NButton class="outline" @click="$router.push('/setting/user/role')"
            >&laquo; ROLES</NButton
          >
        </NButtonGroup>
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <SettingRoleFormCreate @save="onSave" @discard="onDiscard" />
      </NPanel>
    </NAppMain>
  </div>
</template>

<script>
import { defineComponent, useRouter, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  meta: {
    roleGuard: ['admin'],
  },
  setup() {
    const router = useRouter()

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

    return {
      tabs,
      onSave,
      onDiscard,
    }
  },
})
</script>
