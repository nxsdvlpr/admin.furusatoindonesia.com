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
          v-model="
            form.expertise[form.displayLanguage === 'ID' ? 'title' : 'titleJa']
          "
          type="text"
        />
      </NInputGroup>

      <NInputGroup
        :feedback="validation.error('expertise.subtitle')"
        label="Subtitle"
      >
        <NInput
          v-model="
            form.expertise[
              form.displayLanguage === 'ID' ? 'subtitle' : 'subtitleJa'
            ]
          "
          type="text"
        />
      </NInputGroup>

      <NInputGroup :feedback="validation.error('expertise.body')" label="Body">
        <MarkdownEditor
          v-model="
            form.expertise[form.displayLanguage === 'ID' ? 'body' : 'bodyJa']
          "
          height="150px"
        />
      </NInputGroup>

      <NInputGroup :feedback="validation.error('expertise.icon')" label="Icon">
        <NInput v-model="form.expertise.icon" type="text" />
      </NInputGroup>

      <NInputGroup
        :feedback="validation.error('expertise.image')"
        label="Image"
      >
        <UiImageUpload
          path="/program/expertise/"
          :src="form.expertise.image"
          @image-changed="onImageChanged"
        />
      </NInputGroup>

      <NColumn>
        <NInputGroup
          :feedback="validation.error('expertise.published')"
          label="Published"
        >
          <t-toggle v-model="form.expertise.published" />
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
import useFormExpertise from '@/components/program/expertise/useFormExpertise'

import { CREATE_EXPERTISE } from '@/graphql/program/expertise/mutations/CREATE_EXPERTISE'
import { GET_EXPERTISES } from '@/graphql/program/expertise/queries/GET_EXPERTISES'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast } = useContext()

    const { variables } = useNTableCursorRemoteData({
      customVariables: {
        sorting: {
          field: 'sequence',
          direction: 'ASC',
        },
      },
    })

    const { form, validation } = useFormExpertise()

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

    const onImageChanged = (file) => {
      form.expertise.image = file.url
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
      onSave,
      onDiscard,
      onImageChanged,
    }
  },
})
</script>
