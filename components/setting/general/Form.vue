<template>
  <NForm>
    <NFormSection id="site" caption="Site" description="Basic site information">
      <NColumn>
        <NInputGroup label="Site Name">
          <NInput v-model="form.setting.site_name" type="text" />
        </NInputGroup>

        <NInputGroup label="Site Title">
          <NInput v-model="form.setting.site_title" type="text" />
        </NInputGroup>
      </NColumn>
    </NFormSection>

    <NFormAction>
      <NButton class="primary">Save</NButton>
    </NFormAction>
  </NForm>
</template>

<script>
import { defineComponent, reactive } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(props, { emit }) {
    const form = reactive({
      setting: {
        site_name: null,
        site_title: null,
      },
    })

    return {
      form,
    }
  },
})
</script>
