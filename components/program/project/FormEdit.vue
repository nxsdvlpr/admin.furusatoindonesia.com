<template>
  <NForm>
    <NFormSection
      id="overview"
      caption="Overview"
      description="Basic project information"
    >
      <NInputGroup
        :feedback="validation.error('project.subject')"
        label="Subject"
      >
        <NInput v-model="form.project.subject" type="text" />
      </NInputGroup>

      <NInputGroup
        :feedback="validation.error('project.excerpt')"
        label="Excerpt"
      >
        <NTextarea v-model="form.project.excerpt" />
      </NInputGroup>

      <NInputGroup :feedback="validation.error('project.body')" label="Body">
        <NTextarea v-model="form.project.body" />
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

    const { variables } = useNTableCursorRemoteData()

    const { form, validation, resetFormData } = useFormProject()

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
      resetFormData()
    }

    onUpdateProjectDone(({ data }) => {
      $toast.success('Project successfully updated!')
      emit('save')
      resetFormData()
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
    }
  },
})
</script>
