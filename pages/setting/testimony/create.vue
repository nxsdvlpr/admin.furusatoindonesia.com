<template>
  <div>
    <NAppHeader>
      <h1>Testimony</h1>
      <p>Setting &raquo; Testimony &raquo; Create</p>
      <template slot="more">
        <NButtonGroup>
          <NButton class="outline" @click="$router.push('/setting/testimony')"
            >&laquo; TESTIMONY</NButton
          >
        </NButtonGroup>
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <SettingTestimonyFormCreate @save="onSave" @discard="onDiscard" />
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
      router.push('/setting/testimony')
    }

    const onDiscard = () => {
      router.push('/setting/testimony')
    }

    return {
      tabs,
      onSave,
      onDiscard,
    }
  },
})
</script>
