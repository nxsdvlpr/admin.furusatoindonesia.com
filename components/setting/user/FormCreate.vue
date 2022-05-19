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
  watch,
} from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import useNFormValidation from '@/components/nboard/composables/useNFormValidation'
import useNFormValidators from '@/components/nboard/composables/useNFormValidators'
import useCustomValidator from '@/components/setting/user/useCustomValidator'

import { CREATE_USER } from '@/graphql/setting/user/mutations/CREATE_USER'
import { GET_USERS } from '@/graphql/setting/user/queries/GET_USERS'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast } = useContext()

    const { variables } = useNTableCursorRemoteData()

    const { validUsername, uniqueUsername } = useCustomValidator()

    const { required, numeric, minLength, maxLength } = useNFormValidators()

    const form = reactive({
      user: {
        roleId: null,
        name: null,
        username: null,
        password: null,
        phone: null,
      },
      role: null,
    })

    const rules = computed(() => {
      return {
        user: {
          roleId: {
            required,
          },
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
    ]

    const {
      mutate: createUser,
      onDone: onCreateUserDone,
      onError: onCreateUserError,
      loading,
    } = useMutation(CREATE_USER, {
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

      createUser({
        input: {
          user: form.user,
        },
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    onCreateUserDone(({ data }) => {
      $toast.success('User successfully added!')
      emit('save')
    })

    onCreateUserError((error) => {
      $toast.error(error.message)
    })

    const handleRoleChange = (role) => {
      form.user.roleId = role?.id
    }

    watch(() => form.role, handleRoleChange)

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
