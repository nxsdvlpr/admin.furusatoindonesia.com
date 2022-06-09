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

    <NFormSection
      id="role-access"
      caption="Role Access"
      description="Allow role to access this resource"
    >
      <div
        v-for="(value, index) in Object.keys(form.currentRoleAccess)"
        :key="index"
      >
        <t-checkbox v-model="form.currentRoleAccess[value]" />
        <span>{{ $appConfig.defaultRoleAccess[value] }}</span>
      </div>
    </NFormSection>

    <NFormAction :loading="loading" @on-save="onSave" @on-discard="onDiscard" />
  </NForm>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import useFormRole from '@/components/setting/role/useFormRole'

import { CREATE_ROLE } from '@/graphql/setting/role/mutations/CREATE_ROLE'
import { GET_ROLES } from '@/graphql/setting/role/queries/GET_ROLES'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast } = useContext()

    const { variables } = useNTableCursorRemoteData()

    const { form, validation } = useFormRole()

    const refetchQueries = [
      {
        query: GET_ROLES,
        variables,
      },
    ]

    const {
      mutate: createRole,
      onDone: onCreateRoleDone,
      onError: onCreateRoleError,
      loading,
    } = useMutation(CREATE_ROLE, {
      refetchQueries,
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      createRole({
        input: {
          role: form.role,
        },
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    onCreateRoleDone(({ data }) => {
      $toast.success('Role successfully added!')
      emit('save')
    })

    onCreateRoleError((error) => {
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
