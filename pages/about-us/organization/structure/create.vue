<template>
  <div>
    <NAppHeader>
      <h1>Organization Structure</h1>
      <p>Organization Structure &raquo; Create Organization Structure</p>
      <template slot="more">
        <NButtonGroup>
          <NButton
            class="outline"
            @click="$router.push('/about-us/organization/structure')"
            >&laquo; ORGANIZATION STRUCTURES</NButton
          >
        </NButtonGroup>
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <AboutUsOrganizationStructureFormCreate
          @save="onSave"
          @discard="onDiscard"
        />
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
      router.push('/about-us/organization/structure')
    }

    const onDiscard = () => {
      router.push('/about-us/organization/structure')
    }

    return {
      tabs,
      onSave,
      onDiscard,
    }
  },
})
</script>
