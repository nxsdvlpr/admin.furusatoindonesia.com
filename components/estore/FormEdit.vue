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
          <span class="text-xs text-gray-base">
            leave blank if you don't want to change it
          </span>
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
  useRoute,
} from '@nuxtjs/composition-api'
import { useMutation, useQuery } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import useNFormValidation from '@/components/nboard/composables/useNFormValidation'
import useNFormValidators from '@/components/nboard/composables/useNFormValidators'
import useCustomValidator from '@/components/setting/user/useCustomValidator'

import { UPDATE_ESTORE } from '@/graphql/estore/mutations/UPDATE_ESTORE'
import { GET_ESTORES } from '@/graphql/estore/queries/GET_ESTORES'
import { GET_ESTORE } from '@/graphql/estore/queries/GET_ESTORE'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast, error } = useContext()

    const route = useRoute()

    const { variables } = useNTableCursorRemoteData()

    const { validUsername, uniqueUsername } = useCustomValidator()

    const { numeric, required, minLength, maxLength } = useNFormValidators()

    const form = reactive({
      estore: {
        roleId: 3,
        pointId: null,
        name: null,
        username: null,
        password: null,
        phone: null,
      },
      oldUsername: null,
    })

    const rules = computed(() => {
      const usernameRule = {
        required,
        minLengthValue: minLength(3),
        maxLengthValue: maxLength(150),
        uniqueUsername,
        validUsername,
      }

      return {
        estore: {
          name: {
            required,
            minLengthValue: minLength(3),
            maxLengthValue: maxLength(150),
          },
          username:
            form.oldUsername === form.estore.username ? {} : usernameRule,
          password: {
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
      {
        query: GET_ESTORE,
        variables: {
          id: route.value.params.estore_id,
        },
      },
    ]

    const { onResult: onResultEstore } = useQuery(GET_ESTORE, {
      id: route.value.params.estore_id,
    })

    const {
      mutate: updateEstore,
      onDone: onUpdateEstoreDone,
      onError: onUpdateEstoreError,
    } = useMutation(UPDATE_ESTORE, {
      refetchQueries,
    })

    onResultEstore(({ data }) => {
      if (!data.user) {
        return error({ statusCode: 404, message: 'Not Found' })
      }

      const { id, __typename, ...result } = data.user
      form.estore = result
      form.oldUsername = data.user.username
    })

    const { validation } = useNFormValidation(rules, form)

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      updateEstore({
        input: {
          id: route.value.params.estore_id,
          update: form.estore,
        },
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    onUpdateEstoreDone(({ data }) => {
      $toast.success('Estore successfully updated!')
      emit('save')
    })

    onUpdateEstoreError((error) => {
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
