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
  ref,
} from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import useNFormValidation from '@/components/nboard/composables/useNFormValidation'
import useNFormValidators from '@/components/nboard/composables/useNFormValidators'

import { CREATE_PARTNER } from '@/graphql/partner/mutations/CREATE_PARTNER'
import { GET_PARTNERS } from '@/graphql/partner/queries/GET_PARTNERS'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast } = useContext()

    const { variables } = useNTableCursorRemoteData()

    const typeOptions = ref([
      { value: 'ACSC', text: 'ACSC' },
      { value: 'COURIER', text: 'Courier' },
      { value: 'STORE', text: 'Store' },
    ])

    const { required, numeric, email, minLength, maxLength } =
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
    ]

    const {
      mutate: createPartner,
      onDone: onCreatePartnerDone,
      onError: onCreatePartnerError,
    } = useMutation(CREATE_PARTNER, {
      refetchQueries,
    })

    const { validation } = useNFormValidation(rules, form)

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      createPartner({
        input: {
          partner: form.partner,
        },
      })
    }

    const onDiscard = () => {
      emit('discard')
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
      typeOptions,
      onSave,
      onDiscard,
    }
  },
})
</script>
