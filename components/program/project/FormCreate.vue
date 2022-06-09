<template>
  <NForm>
    <div class="flex justify-end">
      <FormLangSelect v-model="form.displayLanguage" />
    </div>
    <NFormSection
      id="overview"
      caption="Overview"
      description="Basic project information"
    >
      <NInputGroup :feedback="validation.error('project.title')" label="Title">
        <NInput
          v-model="
            form.project[form.displayLanguage === 'ID' ? 'title' : 'titleJp']
          "
          type="text"
        />
      </NInputGroup>

      <NInputGroup
        :feedback="validation.error('project.subtitle')"
        label="Subtitle"
      >
        <NInput
          v-model="
            form.project[
              form.displayLanguage === 'ID' ? 'subtitle' : 'subtitleJp'
            ]
          "
          type="text"
        />
      </NInputGroup>

      <NInputGroup :feedback="validation.error('project.body')" label="Body">
        <NTextarea
          v-model="
            form.project[form.displayLanguage === 'ID' ? 'body' : 'bodyJp']
          "
        />
      </NInputGroup>

      <NInputGroup :feedback="validation.error('project.icon')" label="Icon">
        <NInput v-model="form.project.icon" type="text" />
      </NInputGroup>

      <NInputGroup :feedback="validation.error('project.image')" label="Image">
        <ImageUpload
          path="/program/project/"
          :src="form.project.image"
          @image-changed="onImageChanged"
        />
      </NInputGroup>
    </NFormSection>

    <NFormAction :loading="loading" @on-save="onSave" @on-discard="onDiscard" />
  </NForm>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import useFormProject from '@/components/program/project/useFormProject'

import { CREATE_PROJECT } from '@/graphql/program/project/mutations/CREATE_PROJECT'
import { GET_PROJECTS } from '@/graphql/program/project/queries/GET_PROJECTS'

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

    const { form, validation } = useFormProject()

    const refetchQueries = [
      {
        query: GET_PROJECTS,
        variables,
      },
    ]

    const {
      mutate: createProject,
      onDone: onCreateProjectDone,
      onError: onCreateProjectError,
      loading,
    } = useMutation(CREATE_PROJECT, {
      refetchQueries,
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      createProject({
        input: form.project,
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    const onImageChanged = (file) => {
      form.project.image = file.url
    }

    onCreateProjectDone(({ data }) => {
      $toast.success('Project successfully added!')
      emit('save')
    })

    onCreateProjectError((error) => {
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
