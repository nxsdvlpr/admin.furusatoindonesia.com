<template>
  <div>
    <NAppHeader>
      <h1>Office</h1>
      <p>About Us &raquo; Organization &raquo; Office &raquo; Create</p>
      <template slot="more">
        <NButtonGroup>
          <NButton
            class="outline"
            @click="$router.push('/about-us/organization/office')"
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
        <AboutUsOrganizationOfficeFormCreate
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
    accessName: ['admin'],
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
      router.push('/about-us/organization/office')
    }

    const onDiscard = () => {
      router.push('/about-us/organization/office')
    }

    return {
      tabs,
      onSave,
      onDiscard,
    }
  },
})
</script>
