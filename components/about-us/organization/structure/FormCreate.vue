<template>
  <NForm>
    <div class="flex justify-end">
      <FormLangSelect v-model="form.displayLanguage" />
    </div>
    <NFormSection
      id="overview"
      caption="Overview"
      description="Basic Organization Structure information"
    >
      <NInputGroup
        :feedback="validation.error('organizationStructure.subject')"
        label="Subject"
      >
        <NInput
          v-model="
            form.organizationStructure[
              form.displayLanguage === 'ID' ? 'subject' : 'subjectJa'
            ]
          "
          type="text"
        />
      </NInputGroup>

      <NInputGroup
        :feedback="validation.error('organizationStructure.description')"
        label="Description"
      >
        <NTextarea
          v-model="
            form.organizationStructure[
              form.displayLanguage === 'ID' ? 'description' : 'descriptionJa'
            ]
          "
        />
      </NInputGroup>
    </NFormSection>

    <NFormAction :loading="loading" @on-save="onSave" @on-discard="onDiscard" />
  </NForm>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import useFormOrganizationStructure from '@/components/about-us/organization/structure/useFormOrganizationStructure'

import { CREATE_ORGANIZATION_STRUCTURE } from '@/graphql/about-us/organization/structure/mutations/CREATE_ORGANIZATION_STRUCTURE'
import { GET_ORGANIZATION_STRUCTURES } from '@/graphql/about-us/organization/structure/queries/GET_ORGANIZATION_STRUCTURES'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast } = useContext()

    const { variables } = useNTableCursorRemoteData({
      customVariables: {
        sorting: {
          field: 'sequence',
          direction: 'ASC',
        },
      },
    })

    const { form, validation } = useFormOrganizationStructure()

    const refetchQueries = [
      {
        query: GET_ORGANIZATION_STRUCTURES,
        variables,
      },
    ]

    const {
      mutate: createOrganizationStructure,
      onDone: onCreateOrganizationStructureDone,
      onError: onCreateOrganizationStructureError,
      loading,
    } = useMutation(CREATE_ORGANIZATION_STRUCTURE, {
      refetchQueries,
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      createOrganizationStructure({
        input: form.organizationStructure,
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    onCreateOrganizationStructureDone(({ data }) => {
      $toast.success('Organization Structure successfully added!')
      emit('save')
    })

    onCreateOrganizationStructureError((error) => {
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
