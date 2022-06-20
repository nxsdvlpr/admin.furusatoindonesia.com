<template>
  <NForm>
    <NFormSection
      id="overview"
      caption="Overview"
      description="Basic office information"
    >
      <NInputGroup :feedback="validation.error('office.title')" label="Title">
        <NInput v-model="form.office.title" type="text" />
      </NInputGroup>

      <NInputGroup :feedback="validation.error('office.body')" label="Body">
        <MarkdownEditor v-model="form.office.body" height="150px" />
      </NInputGroup>

      <NColumn>
        <NInputGroup
          :feedback="validation.error('office.published')"
          label="Published"
        >
          <t-toggle v-model="form.office.published" />
        </NInputGroup>
      </NColumn>
    </NFormSection>

    <NFormAction :loading="loading" @on-save="onSave" @on-discard="onDiscard" />
  </NForm>
</template>

<script>
import { defineComponent, useContext, useRoute } from '@nuxtjs/composition-api'
import { useMutation, useQuery } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import useFormOffice from '@/components/setting/office/useFormOffice'

import { UPDATE_OFFICE } from '@/graphql/setting/office/mutations/UPDATE_OFFICE'
import { GET_OFFICES } from '@/graphql/setting/office/queries/GET_OFFICES'
import { GET_OFFICE } from '@/graphql/setting/office/queries/GET_OFFICE'

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

    const { form, validation } = useFormOffice()

    const refetchQueries = [
      {
        query: GET_OFFICES,
        variables,
      },
      {
        query: GET_OFFICE,
        variables: {
          id: route.value.params.office_id,
        },
      },
    ]

    const { onResult: onResultOffice } = useQuery(GET_OFFICE, {
      id: route.value.params.office_id,
    })

    const {
      mutate: updateOffice,
      onDone: onUpdateOfficeDone,
      onError: onUpdateOfficeError,
      loading,
    } = useMutation(UPDATE_OFFICE, {
      refetchQueries,
    })

    onResultOffice(({ data }) => {
      if (!data.article) {
        return error({ statusCode: 404, message: 'Not Found' })
      }

      const { id, __typename, ...result } = data.article
      form.office = result
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      updateOffice({
        input: {
          id: route.value.params.office_id,
          update: form.office,
        },
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    onUpdateOfficeDone(({ data }) => {
      $toast.success('Office successfully updated!')
      emit('save')
    })

    onUpdateOfficeError((error) => {
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
