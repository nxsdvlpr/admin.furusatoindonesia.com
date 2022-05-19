<template>
  <div>
    <NAppHeader>
      <h1>Estore</h1>
      <p>Estore &raquo; Create Estore</p>
      <template slot="more">
        <NButtonGroup>
          <NButton class="outline" @click="$router.push('/estore')"
            >&laquo; ESTORES</NButton
          >
        </NButtonGroup>
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <EstoreFormCreate @save="onSave" @discard="onDiscard" />
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
      router.push('/estore')
    }

    const onDiscard = () => {
      router.push('/estore')
    }

    return {
      tabs,
      onSave,
      onDiscard,
    }
  },
})
</script>
