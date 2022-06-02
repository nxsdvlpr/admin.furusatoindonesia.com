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
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import useFormProject from '@/components/program/project/useFormProject'

import { CREATE_PROJECT } from '@/graphql/program/project/mutations/CREATE_PROJECT'
import { GET_PROJECTS } from '@/graphql/program/project/queries/GET_PROJECTS'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast } = useContext()

    const { variables } = useNTableCursorRemoteData()

    const { form, validation, resetFormData } = useFormProject()

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
      resetFormData()
    }

    onCreateProjectDone(({ data }) => {
      $toast.success('Project successfully added!')
      emit('save')
      resetFormData()
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
    }
  },
})
</script>
