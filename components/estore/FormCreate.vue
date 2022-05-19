<template>
  <NForm>
    <NFormSection
      id="overview"
      caption="Overview"
      description="Basic profile information"
    >
      <NColumn>
        <NInputGroup :feedback="validation.error('estore.name')" label="Name">
          <NInput v-model="form.estore.name" type="text" />
        </NInputGroup>

        <NInputGroup :feedback="validation.error('estore.phone')" label="Phone">
          <NInput v-model="form.estore.phone" type="text" />
        </NInputGroup>
      </NColumn>

      <NColumn>
        <NInputGroup
          :feedback="validation.error('estore.username')"
          label="Username"
        >
          <NInput v-model="form.estore.username" type="text" />
        </NInputGroup>
        <NInputGroup
          :feedback="validation.error('estore.password')"
          label="Password"
        >
          <NInput v-model="form.estore.password" type="password" />
        </NInputGroup>
      </NColumn>
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
} from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import useNFormValidation from '@/components/nboard/composables/useNFormValidation'
import useNFormValidators from '@/components/nboard/composables/useNFormValidators'
import useCustomValidator from '@/components/setting/user/useCustomValidator'

import { CREATE_ESTORE } from '@/graphql/estore/mutations/CREATE_ESTORE'
import { GET_ESTORES } from '@/graphql/estore/queries/GET_ESTORES'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast } = useContext()

    const { variables } = useNTableCursorRemoteData()

    const { validUsername, uniqueUsername } = useCustomValidator()

    const { required, numeric, minLength, maxLength } = useNFormValidators()

    const form = reactive({
      estore: {
        roleId: 3,
        pointId: null,
        name: null,
        username: null,
        password: null,
        phone: null,
      },
    })

    const rules = computed(() => {
      return {
        estore: {
          name: {
            required,
            minLengthValue: minLength(3),
            maxLengthValue: maxLength(150),
          },
          username: {
            required,
            minLengthValue: minLength(3),
            maxLengthValue: maxLength(150),
            uniqueUsername,
            validUsername,
          },
          password: {
            required,
            minLengthValue: minLength(5),
            maxLengthValue: maxLength(32),
          },
          phone: {
            required,
            numeric,
            minLengthValue: minLength(9),
            maxLengthValue: maxLength(15),
          },
        },
      }
    })

    const refetchQueries = [
      {
        query: GET_ESTORES,
        variables,
      },
    ]

    const {
      mutate: createEstore,
      onDone: onCreateEstoreDone,
      onError: onCreateEstoreError,
    } = useMutation(CREATE_ESTORE, {
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

      createEstore({
        input: {
          user: form.estore,
        },
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    onCreateEstoreDone(({ data }) => {
      $toast.success('Estore successfully added!')
      emit('save')
    })

    onCreateEstoreError((error) => {
      $toast.error(error.message)
    })

    return {
      validation,
      form,
      onSave,
      onDiscard,
    }
  },
})
</script>
