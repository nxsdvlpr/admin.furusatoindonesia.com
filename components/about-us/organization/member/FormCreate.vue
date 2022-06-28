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
        <UiImageUpload
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
import { useMutation } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import useFormOrganizationMember from '@/components/about-us/organization/member/useFormOrganizationMember'
import { CREATE_ORGANIZATION_MEMBER } from '@/graphql/about-us/organization/member/mutations/CREATE_ORGANIZATION_MEMBER'
import { GET_ORGANIZATION_MEMBERS } from '@/graphql/about-us/organization/member/queries/GET_ORGANIZATION_MEMBERS'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast } = useContext()

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
    ]

    const {
      mutate: createOrganizationMember,
      onDone: onCreateOrganizationMemberDone,
      onError: onCreateOrganizationMemberError,
      loading,
    } = useMutation(CREATE_ORGANIZATION_MEMBER, {
      refetchQueries,
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      createOrganizationMember({
        input: form.organizationMember,
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    const onImageChanged = (file) => {
      form.organizationMember.image = file.url
    }

    onCreateOrganizationMemberDone(({ data }) => {
      $toast.success('Organization Member successfully added!')
      emit('save')
    })

    onCreateOrganizationMemberError((error) => {
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
