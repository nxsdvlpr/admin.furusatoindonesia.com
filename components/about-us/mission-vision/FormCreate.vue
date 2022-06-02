<template>
  <NForm>
    <NFormSection
      id="overview"
      caption="Overview"
      description="Basic missionVision information"
    >
      <NInputGroup
        :feedback="validation.error('missionVision.subject')"
        label="Subject"
      >
        <NInput v-model="form.missionVision.subject" type="text" />
      </NInputGroup>

      <NInputGroup
        :feedback="validation.error('missionVision.excerpt')"
        label="Excerpt"
      >
        <NTextarea v-model="form.missionVision.excerpt" />
      </NInputGroup>

      <NInputGroup
        :feedback="validation.error('missionVision.body')"
        label="Body"
      >
        <NTextarea v-model="form.missionVision.body" />
      </NInputGroup>
    </NFormSection>

    <NFormAction :loading="loading" @on-save="onSave" @on-discard="onDiscard" />
  </NForm>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import useFormMissionVision from '@/components/about-us/mission-vision/useFormMissionVision'

import { CREATE_MISSION_VISION } from '@/graphql/about-us/mission-vision/mutations/CREATE_MISSION_VISION'
import { GET_MISSION_VISIONS } from '@/graphql/about-us/mission-vision/queries/GET_MISSION_VISIONS'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast } = useContext()

    const { variables } = useNTableCursorRemoteData()

    const { form, validation, resetFormData } = useFormMissionVision()

    const refetchQueries = [
      {
        query: GET_MISSION_VISIONS,
        variables,
      },
    ]

    const {
      mutate: createMissionVision,
      onDone: onCreateMissionVisionDone,
      onError: onCreateMissionVisionError,
      loading,
    } = useMutation(CREATE_MISSION_VISION, {
      refetchQueries,
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      createMissionVision({
        input: form.missionVision,
      })
    }

    const onDiscard = () => {
      emit('discard')
      resetFormData()
    }

    onCreateMissionVisionDone(({ data }) => {
      $toast.success('MissionVision successfully added!')
      emit('save')
      resetFormData()
    })

    onCreateMissionVisionError((error) => {
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
