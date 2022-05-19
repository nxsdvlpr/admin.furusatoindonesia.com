<template>
  <NForm>
    <NFormSection
      id="overview"
      caption="Overview"
      description="Basic partner information"
    >
      <NColumn>
        <NInputGroup :feedback="validation.error('partner.name')" label="Name">
          <NInput v-model="form.partner.name" type="text" />
        </NInputGroup>
        <NInputGroup
          :feedback="validation.error('partner.email')"
          label="Email"
        >
          <NInput v-model="form.partner.email" type="email" />
        </NInputGroup>
      </NColumn>

      <NColumn>
        <NInputGroup
          :feedback="validation.error('partner.phone')"
          label="Phone"
        >
          <NInput v-model="form.partner.phone" type="text" />
        </NInputGroup>
        <NInputGroup label="Type">
          <NSelect v-model="form.partner.type" :options="typeOptions"></NSelect>
        </NInputGroup>
      </NColumn>

      <NInputGroup
        :feedback="validation.error('partner.address')"
        label="Address"
      >
        <NTextarea v-model="form.partner.address" rows="3" />
      </NInputGroup>
    </NFormSection>

    <NFormAction @on-save="onSave" @on-discard="onDiscard"></NFormAction>
  </NForm>
</template>

<script>
import {
  defineComponent,
  useContext,
  computed,
  reactive,
  useRoute,
  ref,
} from '@nuxtjs/composition-api'
import { useMutation, useQuery } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import useNFormValidation from '@/components/nboard/composables/useNFormValidation'
import useNFormValidators from '@/components/nboard/composables/useNFormValidators'

import { UPDATE_PARTNER } from '@/graphql/partner/mutations/UPDATE_PARTNER'
import { GET_PARTNERS } from '@/graphql/partner/queries/GET_PARTNERS'
import { GET_PARTNER } from '@/graphql/partner/queries/GET_PARTNER'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast, error } = useContext()

    const route = useRoute()

    const { variables } = useNTableCursorRemoteData()

    const typeOptions = ref([
      { value: 'ACSC', text: 'ACSC' },
      { value: 'COURIER', text: 'Courier' },
      { value: 'STORE', text: 'Store' },
    ])

    const { numeric, email, required, minLength, maxLength } =
      useNFormValidators()

    const form = reactive({
      partner: {
        name: null,
        email: null,
        phone: null,
        address: null,
        type: 'ACSC',
      },
    })

    const rules = computed(() => {
      return {
        partner: {
          name: {
            required,
            minLengthValue: minLength(3),
            maxLengthValue: maxLength(150),
          },
          email: { required, email },
          type: { required },
          phone: {
            numeric,
            minLengthValue: minLength(9),
            maxLengthValue: maxLength(15),
          },
        },
      }
    })

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
    } = useMutation(UPDATE_PARTNER, {
      refetchQueries,
    })

    onResultPartner(({ data }) => {
      if (!data.partner) {
        return error({ statusCode: 404, message: 'Not Found' })
      }

      const { id, __typename, ...result } = data.partner

      form.partner = result
    })

    const { validation } = useNFormValidation(rules, form)

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
      typeOptions,
      onSave,
      onDiscard,
    }
  },
})
</script>
