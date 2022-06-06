<template>
  <NForm>
    <div class="flex justify-end">
      <FormLangSelect v-model="form.displayLanguage" />
    </div>
    <NFormSection
      id="overview"
      caption="Overview"
      description="Basic Organization Member information"
    >
      <NInputGroup
        :feedback="validation.error('organizationMember.fullname')"
        label="Fullname"
      >
        <NInput v-model="form.organizationMember.fullname" type="text" />
      </NInputGroup>

      <NInputGroup
        :feedback="validation.error('organizationMember.profession')"
        label="Profession"
      >
        <NInput
          v-if="form.displayLanguage === 'ID'"
          v-model="form.organizationMember.profession"
          type="text"
        />
        <NInput
          v-else
          v-model="form.organizationMember.professionJp"
          type="text"
        />
      </NInputGroup>
    </NFormSection>

    <NFormAction :loading="loading" @on-save="onSave" @on-discard="onDiscard" />
  </NForm>
</template>

<script>
import { defineComponent, useContext, useRoute } from '@nuxtjs/composition-api'
import { useMutation, useQuery } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import useFormOrganizationMember from '@/components/about-us/organization/member/useFormOrganizationMember'

import { UPDATE_ORGANIZATION_MEMBER } from '@/graphql/about-us/organization/member/mutations/UPDATE_ORGANIZATION_MEMBER'
import { GET_ORGANIZATION_MEMBERS } from '@/graphql/about-us/organization/member/queries/GET_ORGANIZATION_MEMBERS'
import { GET_ORGANIZATION_MEMBER } from '@/graphql/about-us/organization/member/queries/GET_ORGANIZATION_MEMBER'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast, error } = useContext()

    const route = useRoute()

    const { variables } = useNTableCursorRemoteData({
      customVariables: {
        organizationId: route.value.params.structure_id,
        sorting: {
          field: 'sequence',
          direction: 'ASC',
        },
      },
    })

    const { form, validation } = useFormOrganizationMember()

    const refetchQueries = [
      {
        query: GET_ORGANIZATION_MEMBERS,
        variables,
      },
      {
        query: GET_ORGANIZATION_MEMBER,
        variables: {
          id: route.value.params.member_id,
        },
      },
    ]

    const { onResult: onResultOrganizationMember } = useQuery(
      GET_ORGANIZATION_MEMBER,
      {
        id: route.value.params.member_id,
      }
    )

    const {
      mutate: updateOrganizationMember,
      onDone: onUpdateOrganizationMemberDone,
      onError: onUpdateOrganizationMemberError,
      loading,
    } = useMutation(UPDATE_ORGANIZATION_MEMBER, {
      refetchQueries,
    })

    onResultOrganizationMember(({ data }) => {
      if (!data.organizationMember) {
        return error({ statusCode: 404, message: 'Not Found' })
      }

      const { id, __typename, ...result } = data.organizationMember
      form.organizationMember = result
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      updateOrganizationMember({
        input: {
          id: route.value.params.member_id,
          update: form.organizationMember,
        },
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    onUpdateOrganizationMemberDone(({ data }) => {
      $toast.success('Organization Member successfully updated!')
      emit('save')
    })

    onUpdateOrganizationMemberError((error) => {
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
