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
        <MarkdownEditor
          v-model="
            form.project[form.displayLanguage === 'ID' ? 'body' : 'bodyJp']
          "
          height="150px"
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
import { defineComponent, useContext, useRoute } from '@nuxtjs/composition-api'
import { useMutation, useQuery } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import useFormProject from '@/components/program/project/useFormProject'

import { UPDATE_PROJECT } from '@/graphql/program/project/mutations/UPDATE_PROJECT'
import { GET_PROJECTS } from '@/graphql/program/project/queries/GET_PROJECTS'
import { GET_PROJECT } from '@/graphql/program/project/queries/GET_PROJECT'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast, error } = useContext()

    const route = useRoute()

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
      {
        query: GET_PROJECT,
        variables: {
          id: route.value.params.project_id,
        },
      },
    ]

    const { onResult: onResultProject } = useQuery(GET_PROJECT, {
      id: route.value.params.project_id,
    })

    const {
      mutate: updateProject,
      onDone: onUpdateProjectDone,
      onError: onUpdateProjectError,
      loading,
    } = useMutation(UPDATE_PROJECT, {
      refetchQueries,
    })

    onResultProject(({ data }) => {
      if (!data.article) {
        return error({ statusCode: 404, message: 'Not Found' })
      }

      const { id, __typename, ...result } = data.article
      form.project = result
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      updateProject({
        input: {
          id: route.value.params.project_id,
          update: form.project,
        },
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    const onImageChanged = (file) => {
      form.project.image = file.url
    }

    onUpdateProjectDone(({ data }) => {
      $toast.success('Project successfully updated!')
      emit('save')
    })

    onUpdateProjectError((error) => {
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
