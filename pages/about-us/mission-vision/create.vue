<template>
  <div>
    <NAppHeader>
      <h1>Mission and Vision</h1>
      <p>Mission and Vision &raquo; Create Mission and Vision</p>
      <template slot="more">
        <NButtonGroup>
          <NButton
            class="outline"
            @click="$router.push('/about-us/mission-vision')"
            >&laquo; MISSION VISIONS</NButton
          >
        </NButtonGroup>
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <AboutUsMissionVisionFormCreate @save="onSave" @discard="onDiscard" />
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
      router.push('/about-us/mission-vision')
    }

    const onDiscard = () => {
      router.push('/about-us/mission-vision')
    }

    return {
      tabs,
      onSave,
      onDiscard,
    }
  },
})
</script>
