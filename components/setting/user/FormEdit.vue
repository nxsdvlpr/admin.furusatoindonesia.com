<template>
  <NForm>
    <NFormSection
      id="overview"
      caption="Overview"
      description="Basic profile information"
    >
      <NColumn>
        <NInputGroup :feedback="validation.error('user.name')" label="Name">
          <NInput v-model="form.user.name" type="text" />
        </NInputGroup>

        <NInputGroup :feedback="validation.error('user.phone')" label="Phone">
          <NInput v-model="form.user.phone" type="text" />
        </NInputGroup>
      </NColumn>

      <NColumn>
        <NInputGroup
          :feedback="validation.error('user.username')"
          label="Username"
        >
          <NInput v-model="form.user.username" type="text" />
        </NInputGroup>
        <NInputGroup
          :feedback="validation.error('user.password')"
          label="Password"
        >
          <NInput v-model="form.user.password" type="password" />
          <span class="text-xs text-gray-base">
            leave blank if you don't want to change it
          </span>
        </NInputGroup>
      </NColumn>

      <NColumn>
        <NInputGroup :feedback="validation.error('user.roleId')" label="Role">
          <SettingRoleSelect v-model="form.role" />
        </NInputGroup>
      </NColumn>
    </NFormSection>

    <NFormAction :loading="loading" @on-save="onSave" @on-discard="onDiscard" />
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

import { UPDATE_USER } from '@/graphql/setting/user/mutations/UPDATE_USER'
import { GET_USERS } from '@/graphql/setting/user/queries/GET_USERS'
import { GET_USER } from '@/graphql/setting/user/queries/GET_USER'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast, error } = useContext()

    const route = useRoute()

    const { variables } = useNTableCursorRemoteData()

    const { validUsername, uniqueUsername } = useCustomValidator()

    const { numeric, required, minLength, maxLength } = useNFormValidators()

    const form = reactive({
      user: {
        roleId: 1,
        pointId: null,
        name: null,
        username: null,
        password: null,
        phone: null,
      },
      oldUsername: null,
      role: null,
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
        user: {
          name: {
            required,
            minLengthValue: minLength(3),
            maxLengthValue: maxLength(150),
          },
          username: form.oldUsername === form.user.username ? {} : usernameRule,
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
        query: GET_USERS,
        variables,
      },
      {
        query: GET_USER,
        variables: {
          id: route.value.params.user_id,
        },
      },
    ]

    const { onResult: onResultUser } = useQuery(GET_USER, {
      id: route.value.params.user_id,
    })

    const {
      mutate: updateUser,
      onDone: onUpdateUserDone,
      onError: onUpdateUserError,
      loading,
    } = useMutation(UPDATE_USER, {
      refetchQueries,
    })

    onResultUser(({ data }) => {
      if (!data.user) {
        return error({ statusCode: 404, message: 'Not Found' })
      }

      const { id, role, __typename, ...result } = data.user
      form.user = result
      form.oldUsername = data.user.username
      form.role = data.user.role
    })

    const { validation } = useNFormValidation(rules, form)

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      updateUser({
        input: {
          id: route.value.params.user_id,
          update: form.user,
        },
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    onUpdateUserDone(({ data }) => {
      $toast.success('User successfully updated!')
      emit('save')
    })

    onUpdateUserError((error) => {
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
