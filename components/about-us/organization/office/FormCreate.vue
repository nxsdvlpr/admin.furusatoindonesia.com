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
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import useFormOffice from '@/components/about-us/organization/office/useFormOffice'

import { CREATE_OFFICE } from '@/graphql/about-us/organization/office/mutations/CREATE_OFFICE'
import { GET_OFFICES } from '@/graphql/about-us/organization/office/queries/GET_OFFICES'

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

    const { form, validation } = useFormOffice()

    const refetchQueries = [
      {
        query: GET_OFFICES,
        variables,
      },
    ]

    const {
      mutate: createOffice,
      onDone: onCreateOfficeDone,
      onError: onCreateOfficeError,
      loading,
    } = useMutation(CREATE_OFFICE, {
      refetchQueries,
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      createOffice({
        input: form.office,
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    onCreateOfficeDone(({ data }) => {
      $toast.success('Office successfully added!')
      emit('save')
    })

    onCreateOfficeError((error) => {
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
