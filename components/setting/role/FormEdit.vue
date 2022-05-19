<template>
  <NForm>
    <NFormSection
      id="overview"
      caption="Overview"
      description="Basic role information"
    >
      <NColumn>
        <NInputGroup :feedback="validation.error('role.name')" label="Name">
          <NInput v-model="form.role.name" type="text" />
        </NInputGroup>

        <NInputGroup
          :feedback="validation.error('role.shortname')"
          label="Shortname"
        >
          <NInput v-model="form.role.shortname" type="text" />
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

import { UPDATE_ROLE } from '@/graphql/setting/role/mutations/UPDATE_ROLE'
import { GET_ROLES } from '@/graphql/setting/role/queries/GET_ROLES'
import { GET_ROLE } from '@/graphql/setting/role/queries/GET_ROLE'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast, error } = useContext()

    const route = useRoute()

    const { variables } = useNTableCursorRemoteData()

    const { required, minLength, maxLength } = useNFormValidators()

    const form = reactive({
      role: {
        name: null,
        shortname: null,
        access: {},
      },
    })

    const rules = computed(() => {
      return {
        role: {
          name: {
            required,
            minLengthValue: minLength(3),
            maxLengthValue: maxLength(150),
          },
          shortname: {
            required,
            minLengthValue: minLength(3),
            maxLengthValue: maxLength(150),
          },
        },
      }
    })

    const refetchQueries = [
      {
        query: GET_ROLES,
        variables,
      },
      {
        query: GET_ROLE,
        variables: {
          id: route.value.params.role_id,
        },
      },
    ]

    const { onResult: onResultRole } = useQuery(GET_ROLE, {
      id: route.value.params.role_id,
    })

    const {
      mutate: updateRole,
      onDone: onUpdateRoleDone,
      onError: onUpdateRoleError,
      loading,
    } = useMutation(UPDATE_ROLE, {
      refetchQueries,
    })

    onResultRole(({ data }) => {
      if (!data.role) {
        return error({ statusCode: 404, message: 'Not Found' })
      }

      const { id, __typename, ...result } = data.role
      form.role = result
    })

    const { validation } = useNFormValidation(rules, form)

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      updateRole({
        input: {
          id: route.value.params.role_id,
          update: form.role,
        },
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    onUpdateRoleDone(({ data }) => {
      $toast.success('Role successfully updated!')
      emit('save')
    })

    onUpdateRoleError((error) => {
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
