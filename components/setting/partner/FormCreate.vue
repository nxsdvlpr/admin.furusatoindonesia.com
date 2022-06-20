<template>
  <NForm>
    <NFormSection
      id="overview"
      caption="Overview"
      description="Basic partner information"
    >
      <NInputGroup :feedback="validation.error('partner.title')" label="Title">
        <NInput v-model="form.partner.title" type="text" />
      </NInputGroup>

      <NInputGroup :feedback="validation.error('partner.image')" label="Image">
        <ImageUpload
          path="/setting/partner/"
          :src="form.partner.image"
          @image-changed="onImageChanged"
        />
      </NInputGroup>

      <NColumn>
        <NInputGroup
          :feedback="validation.error('partner.published')"
          label="Published"
        >
          <t-toggle v-model="form.partner.published" />
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
import useFormPartner from '@/components/setting/partner/useFormPartner'

import { CREATE_PARTNER } from '@/graphql/setting/partner/mutations/CREATE_PARTNER'
import { GET_PARTNERS } from '@/graphql/setting/partner/queries/GET_PARTNERS'

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

    const { form, validation } = useFormPartner()

    const refetchQueries = [
      {
        query: GET_PARTNERS,
        variables,
      },
    ]

    const {
      mutate: createPartner,
      onDone: onCreatePartnerDone,
      onError: onCreatePartnerError,
      loading,
    } = useMutation(CREATE_PARTNER, {
      refetchQueries,
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      createPartner({
        input: form.partner,
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    const onImageChanged = (file) => {
      form.partner.image = file.url
    }

    onCreatePartnerDone(({ data }) => {
      $toast.success('Partner successfully added!')
      emit('save')
    })

    onCreatePartnerError((error) => {
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
