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
        <UiImageUpload
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
import { defineComponent, useContext, useRoute } from '@nuxtjs/composition-api'
import { useMutation, useQuery } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import useFormPartner from '@/components/setting/partner/useFormPartner'

import { UPDATE_PARTNER } from '@/graphql/setting/partner/mutations/UPDATE_PARTNER'
import { GET_PARTNERS } from '@/graphql/setting/partner/queries/GET_PARTNERS'
import { GET_PARTNER } from '@/graphql/setting/partner/queries/GET_PARTNER'

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

    const { form, validation } = useFormPartner()

    const refetchQueries = [
      {
        query: GET_PARTNERS,
        variables,
      },
      {
        query: GET_PARTNER,
        variables: {
          id: route.value.params.partner_id,
        },
      },
    ]

    const { onResult: onResultPartner } = useQuery(GET_PARTNER, {
      id: route.value.params.partner_id,
    })

    const {
      mutate: updatePartner,
      onDone: onUpdatePartnerDone,
      onError: onUpdatePartnerError,
      loading,
    } = useMutation(UPDATE_PARTNER, {
      refetchQueries,
    })

    onResultPartner(({ data }) => {
      if (!data.article) {
        return error({ statusCode: 404, message: 'Not Found' })
      }

      const { id, __typename, ...result } = data.article
      form.partner = result
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      updatePartner({
        input: {
          id: route.value.params.partner_id,
          update: form.partner,
        },
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    const onImageChanged = (file) => {
      form.partner.image = file.url
    }

    onUpdatePartnerDone(({ data }) => {
      $toast.success('Partner successfully updated!')
      emit('save')
    })

    onUpdatePartnerError((error) => {
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
