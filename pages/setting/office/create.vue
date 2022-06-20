<template>
  <div>
    <NAppHeader>
      <h1>Office</h1>
      <p>Setting &raquo; Office &raquo; Create</p>
      <template slot="more">
        <NButtonGroup>
          <NButton class="outline" @click="$router.push('/setting/office')"
            >&laquo; OFFICES</NButton
          >
        </NButtonGroup>
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <SettingOfficeFormCreate @save="onSave" @discard="onDiscard" />
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
    ])

    const onSave = () => {
      router.push('/setting/office')
    }

    const onDiscard = () => {
      router.push('/setting/office')
    }

    return {
      tabs,
      onSave,
      onDiscard,
    }
  },
})
</script>
