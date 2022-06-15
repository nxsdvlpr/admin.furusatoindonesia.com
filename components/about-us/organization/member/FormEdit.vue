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
          v-model="
            form.organizationMember[
              form.displayLanguage === 'ID' ? 'profession' : 'professionJa'
            ]
          "
          type="text"
        />
      </NInputGroup>

      <NInputGroup
        :feedback="validation.error('organizationMember.image')"
        label="Image"
      >
        <ImageUpload
          path="/about-us/organization-member/"
          :src="form.organizationMember.image"
          @image-changed="onImageChanged"
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

    const onImageChanged = (file) => {
      form.organizationMember.image = file.url
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
      onImageChanged,
    }
  },
})
</script>
