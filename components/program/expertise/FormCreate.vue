<template>
  <NForm>
    <div class="flex justify-end">
      <FormLangSelect v-model="form.displayLanguage" />
    </div>
    <NFormSection
      id="overview"
      caption="Overview"
      description="Basic expertise information"
    >
      <NInputGroup
        :feedback="validation.error('expertise.title')"
        label="Title"
      >
        <NInput
          v-if="form.displayLanguage === 'ID'"
          v-model="form.expertise.title"
          type="text"
        />
        <NInput v-else v-model="form.expertise.titleJp" type="text" />
      </NInputGroup>

      <NInputGroup
        :feedback="validation.error('expertise.subtitle')"
        label="Subtitle"
      >
        <NInput
          v-if="form.displayLanguage === 'ID'"
          v-model="form.expertise.subtitle"
          type="text"
        />
        <NInput v-else v-model="form.expertise.subtitleJp" type="text" />
      </NInputGroup>

      <NInputGroup :feedback="validation.error('expertise.body')" label="Body">
        <NTextarea
          v-if="form.displayLanguage === 'ID'"
          v-model="form.expertise.body"
        />
        <NTextarea v-else v-model="form.expertise.bodyJp" />
      </NInputGroup>

      <NInputGroup :feedback="validation.error('expertise.icon')" label="Icon">
        <NInput v-model="form.expertise.icon" type="text" />
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

    const { variables } = useNTableCursorRemoteData({
      customVariables: {
        sorting: {
          field: 'sequence',
          direction: 'ASC',
        },
      },
    })

    const { form, validation } = useFormExpertise()

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
    }

    const onUploadImageDone = (files) => {
      form.expertise.image = files[0] ? files[0].url : null
    }

    onCreateExpertiseDone(({ data }) => {
      $toast.success('Expertise successfully added!')
      emit('save')
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
