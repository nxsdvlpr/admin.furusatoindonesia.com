<template>
  <div>
    <NAppHeader>
      <h1>Organization Member</h1>
      <p>
        About Us &raquo; Organization Structure &raquo; Member &raquo; Create
      </p>
      <template slot="more">
        <NButtonGroup>
          <NButton class="outline" @click="back()"
            >&laquo; ORGANIZATION MEMBERS</NButton
          >
        </NButtonGroup>
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <AboutUsOrganizationMemberFormCreate
          @save="onSave"
          @discard="onDiscard"
        />
      </NPanel>
    </NAppMain>
  </div>
</template>

<script>
import {
  defineComponent,
  useRouter,
  ref,
  useRoute,
  computed,
} from '@nuxtjs/composition-api'

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

    const id = computed(() => route.value.params.structure_id)

    const back = () => {
      router.push(`/about-us/organization/structure/${id.value}/member`)
    }

    const onSave = () => {
      back()
    }

    const onDiscard = () => {
      back()
    }

    return {
      tabs,
      back,
      onSave,
      onDiscard,
    }
  },
})
</script>
