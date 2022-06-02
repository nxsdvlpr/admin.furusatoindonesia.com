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
import { defineComponent, useContext, useRoute } from '@nuxtjs/composition-api'
import { useMutation, useQuery } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import useFormMissionVision from '@/components/about-us/mission-vision/useFormMissionVision'

import { UPDATE_MISSION_VISION } from '@/graphql/about-us/mission-vision/mutations/UPDATE_MISSION_VISION'
import { GET_MISSION_VISIONS } from '@/graphql/about-us/mission-vision/queries/GET_MISSION_VISIONS'
import { GET_MISSION_VISION } from '@/graphql/about-us/mission-vision/queries/GET_MISSION_VISION'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast, error } = useContext()

    const route = useRoute()

    const { variables } = useNTableCursorRemoteData()

    const { form, validation, resetFormData } = useFormMissionVision()

    const refetchQueries = [
      {
        query: GET_MISSION_VISIONS,
        variables,
      },
      {
        query: GET_MISSION_VISION,
        variables: {
          id: route.value.params.mission_id,
        },
      },
    ]

    const { onResult: onResultMissionVision } = useQuery(GET_MISSION_VISION, {
      id: route.value.params.mission_id,
    })

    const {
      mutate: updateMissionVision,
      onDone: onUpdateMissionVisionDone,
      onError: onUpdateMissionVisionError,
      loading,
    } = useMutation(UPDATE_MISSION_VISION, {
      refetchQueries,
    })

    onResultMissionVision(({ data }) => {
      if (!data.article) {
        return error({ statusCode: 404, message: 'Not Found' })
      }

      const { id, __typename, ...result } = data.article
      form.missionVision = result
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      updateMissionVision({
        input: {
          id: route.value.params.mission_id,
          update: form.missionVision,
        },
      })
    }

    const onDiscard = () => {
      emit('discard')
      resetFormData()
    }

    onUpdateMissionVisionDone(({ data }) => {
      $toast.success('Mission Vision successfully updated!')
      emit('save')
      resetFormData()
    })

    onUpdateMissionVisionError((error) => {
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
