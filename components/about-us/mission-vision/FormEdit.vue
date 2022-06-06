<template>
  <NForm>
    <div class="flex justify-end">
      <FormLangSelect v-model="form.displayLanguage" />
    </div>
    <NFormSection
      id="overview"
      caption="Overview"
      description="Basic Mission Vision information"
    >
      <NInputGroup
        :feedback="validation.error('missionVision.title')"
        label="Subject"
      >
        <NInput
          v-if="form.displayLanguage === 'ID'"
          v-model="form.missionVision.title"
          type="text"
        />
        <NInput v-else v-model="form.missionVision.titleJp" type="text" />
      </NInputGroup>

      <NInputGroup
        :feedback="validation.error('missionVision.body')"
        label="Body"
      >
        <NTextarea
          v-if="form.displayLanguage === 'ID'"
          v-model="form.missionVision.body"
        />
        <NTextarea v-else v-model="form.missionVision.bodyJp" />
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

    const { variables } = useNTableCursorRemoteData({
      customVariables: {
        sorting: {
          field: 'sequence',
          direction: 'ASC',
        },
      },
    })

    const { form, validation } = useFormMissionVision()

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
    }

    onUpdateMissionVisionDone(({ data }) => {
      $toast.success('Mission Vision successfully updated!')
      emit('save')
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
