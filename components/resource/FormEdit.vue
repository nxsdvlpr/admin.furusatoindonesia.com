<template>
  <NForm>
    <NFormSection
      id="overview"
      caption="Overview"
      description="Basic profile information"
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
import { defineComponent, useContext, useRoute } from '@nuxtjs/composition-api'
import { useMutation, useQuery } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import useFormResource from '@/components/resource/useFormResource'

import { UPDATE_RESOURCE } from '@/graphql/resource/mutations/UPDATE_RESOURCE'
import { GET_RESOURCES } from '@/graphql/resource/queries/GET_RESOURCES'
import { GET_RESOURCE } from '@/graphql/resource/queries/GET_RESOURCE'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast, error } = useContext()

    const route = useRoute()

    const { variables } = useNTableCursorRemoteData()

    const { form, validation, resetFormData } = useFormResource()

    const refetchQueries = [
      {
        query: GET_RESOURCES,
        variables,
      },
      {
        query: GET_RESOURCE,
        variables: {
          id: route.value.params.resource_id,
        },
      },
    ]

    const { onResult: onResultResource } = useQuery(GET_RESOURCE, {
      id: route.value.params.resource_id,
    })

    const {
      mutate: updateResource,
      onDone: onUpdateResourceDone,
      onError: onUpdateResourceError,
      loading,
    } = useMutation(UPDATE_RESOURCE, {
      refetchQueries,
    })

    onResultResource(({ data }) => {
      if (!data.resource) {
        return error({ statusCode: 404, message: 'Not Found' })
      }

      const { id, __typename, ...result } = data.resource
      form.resource = result
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      updateResource({
        input: {
          id: route.value.params.resource_id,
          update: form.resource,
        },
      })
    }

    const onDiscard = () => {
      emit('discard')
      resetFormData()
    }

    onUpdateResourceDone(({ data }) => {
      $toast.success('Resource successfully updated!')
      emit('save')
      resetFormData()
    })

    onUpdateResourceError((error) => {
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
