<template>
  <NForm>
    <NFormSection
      id="overview"
      caption="Overview"
      description="Basic expertise information"
    >
      <NInputGroup
        :feedback="validation.error('expertise.subject')"
        label="Subject"
      >
        <NInput v-model="form.expertise.subject" type="text" />
      </NInputGroup>

      <NInputGroup
        :feedback="validation.error('expertise.excerpt')"
        label="Excerpt"
      >
        <NTextarea v-model="form.expertise.excerpt" />
      </NInputGroup>

      <NInputGroup :feedback="validation.error('expertise.body')" label="Body">
        <NTextarea v-model="form.expertise.body" />
      </NInputGroup>

      <!-- <NInputGroup :feedback="validation.error('expertise.body')" label="Body">
        <NFileUpload
          ref="imageUpload"
          :value="form.images"
          :endpoint="uploadEndpoint"
          extensions="jpg,jpeg,png"
          accept="image/png,image/jpeg"
          :multiple="false"
          @upload-done="onUploadImageDone"
        />
      </NInputGroup> -->
    </NFormSection>

    <NFormAction :loading="loading" @on-save="onSave" @on-discard="onDiscard" />
  </NForm>
</template>

<script>
import { defineComponent, useContext, computed } from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import useFormExpertise from '@/components/program/expertise/useFormExpertise'

import { CREATE_EXPERTISE } from '@/graphql/program/expertise/mutations/CREATE_EXPERTISE'
import { GET_EXPERTISES } from '@/graphql/program/expertise/queries/GET_EXPERTISES'

export default defineComponent({
  setup(props, { emit }) {
    const { env, $toast } = useContext()

    const { variables } = useNTableCursorRemoteData()

    const { form, validation, resetFormData } = useFormExpertise()

    const uploadEndpoint = computed(() => env.uploadEndpoint)

    const refetchQueries = [
      {
        query: GET_EXPERTISES,
        variables,
      },
    ]

    const {
      mutate: createExpertise,
      onDone: onCreateExpertiseDone,
      onError: onCreateExpertiseError,
      loading,
    } = useMutation(CREATE_EXPERTISE, {
      refetchQueries,
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      createExpertise({
        input: form.expertise,
      })
    }

    const onDiscard = () => {
      emit('discard')
      resetFormData()
    }

    const onUploadImageDone = (files) => {
      form.expertise.image = files[0] ? files[0].url : null
    }

    onCreateExpertiseDone(({ data }) => {
      $toast.success('Expertise successfully added!')
      emit('save')
      resetFormData()
    })

    onCreateExpertiseError((error) => {
      $toast.error(error.message)
    })

    return {
      validation,
      form,
      loading,
      uploadEndpoint,
      onUploadImageDone,
      onSave,
      onDiscard,
    }
  },
})
</script>
