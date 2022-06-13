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
              form.displayLanguage === 'ID' ? 'subject' : 'subjectJp'
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
              form.displayLanguage === 'ID' ? 'description' : 'descriptionJp'
            ]
          "
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
import useFormOrganizationStructure from '@/components/about-us/organization/structure/useFormOrganizationStructure'

import { UPDATE_ORGANIZATION_STRUCTURE } from '@/graphql/about-us/organization/structure/mutations/UPDATE_ORGANIZATION_STRUCTURE'
import { GET_ORGANIZATION_STRUCTURES } from '@/graphql/about-us/organization/structure/queries/GET_ORGANIZATION_STRUCTURES'
import { GET_ORGANIZATION_STRUCTURE } from '@/graphql/about-us/organization/structure/queries/GET_ORGANIZATION_STRUCTURE'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast, error } = useContext()

    const route = useRoute()

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
      {
        query: GET_ORGANIZATION_STRUCTURE,
        variables: {
          id: route.value.params.structure_id,
        },
      },
    ]

    const { onResult: onResultOrganizationStructure } = useQuery(
      GET_ORGANIZATION_STRUCTURE,
      {
        id: route.value.params.structure_id,
      }
    )

    const {
      mutate: updateOrganizationStructure,
      onDone: onUpdateOrganizationStructureDone,
      onError: onUpdateOrganizationStructureError,
      loading,
    } = useMutation(UPDATE_ORGANIZATION_STRUCTURE, {
      refetchQueries,
    })

    onResultOrganizationStructure(({ data }) => {
      if (!data.organizationStructure) {
        return error({ statusCode: 404, message: 'Not Found' })
      }

      const { id, __typename, ...result } = data.organizationStructure
      form.organizationStructure = result
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      updateOrganizationStructure({
        input: {
          id: route.value.params.structure_id,
          update: form.organizationStructure,
        },
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    onUpdateOrganizationStructureDone(({ data }) => {
      $toast.success('Organization Structure successfully updated!')
      emit('save')
    })

    onUpdateOrganizationStructureError((error) => {
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
