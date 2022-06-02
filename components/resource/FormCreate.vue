<template>
  <NForm>
    <NFormSection
      id="overview"
      caption="Overview"
      description="Basic expertise information"
    >
      <NInputGroup
        :feedback="validation.error('resource.subject')"
        label="Subject"
      >
        <NInput v-model="form.resource.subject" type="text" />
      </NInputGroup>

      <NInputGroup
        :feedback="validation.error('resource.excerpt')"
        label="Excerpt"
      >
        <NTextarea v-model="form.resource.excerpt" />
      </NInputGroup>

      <NInputGroup :feedback="validation.error('resource.body')" label="Body">
        <NTextarea v-model="form.resource.body" />
      </NInputGroup>

      <NColumn>
        <NInputGroup
          :feedback="validation.error('resource.publishedAt')"
          label="Published At"
        >
          <NDatepicker v-model="form.resource.publishedAt" :clearable="false" />
        </NInputGroup>
      </NColumn>

      <NColumn>
        <NInputGroup
          :feedback="validation.error('resource.published')"
          label="Published"
        >
          <t-toggle v-model="form.resource.published" />
        </NInputGroup>
      </NColumn>
    </NFormSection>

    <NFormAction :loading="loading" @on-save="onSave" @on-discard="onDiscard" />
  </NForm>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import useFormResource from '@/components/resource/useFormResource'

import { CREATE_RESOURCE } from '@/graphql/resource/mutations/CREATE_RESOURCE'
import { GET_RESOURCES } from '@/graphql/resource/queries/GET_RESOURCES'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast } = useContext()

    const { variables } = useNTableCursorRemoteData()

    const { form, validation, resetFormData } = useFormResource()

    const refetchQueries = [
      {
        query: GET_RESOURCES,
        variables,
      },
    ]

    const {
      mutate: createResource,
      onDone: onCreateResourceDone,
      onError: onCreateResourceError,
      loading,
    } = useMutation(CREATE_RESOURCE, {
      refetchQueries,
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      createResource({
        input: form.resource,
      })
    }

    const onDiscard = () => {
      emit('discard')
      resetFormData()
    }

    onCreateResourceDone(({ data }) => {
      $toast.success('Resource successfully added!')
      emit('save')
      resetFormData()
    })

    onCreateResourceError((error) => {
      $toast.error(error.message)
    })

    return {
      validation,
      form,
      loading,
      onSave,
      onDiscard,
    }
  },
})
</script>
