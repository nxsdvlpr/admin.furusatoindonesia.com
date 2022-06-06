<template>
  <NFormSection
    :id="title.toLowerCase()"
    :caption="title"
    :description="`Basic ${title.toLowerCase()} information`"
  >
    <div class="flex justify-end">
      <FormLangSelect v-model="form.displayLanguage" />
    </div>

    <NInputGroup :feedback="validation.error('page.title')" label="Title">
      <NInput
        v-if="form.displayLanguage === 'ID'"
        v-model="form.page.title"
        type="text"
      />
      <NInput v-else v-model="form.page.titleJp" type="text" />
    </NInputGroup>

    <NInputGroup :feedback="validation.error('page.subtitle')" label="Subtitle">
      <NInput
        v-if="form.displayLanguage === 'ID'"
        v-model="form.page.subtitle"
        type="text"
      />
      <NInput v-else v-model="form.page.subtitleJp" type="text" />
    </NInputGroup>

    <NFormAction>
      <NButton :disabled="loading" class="primary" @click="onSave">
        Save
      </NButton>
    </NFormAction>
  </NFormSection>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useMutation, useQuery } from '@vue/apollo-composable'

import useFormPagePrograms from '@/components/setting/pages/programs/useFormPagePrograms'

import { UPDATE_PAGE_PROGRAM } from '@/graphql/setting/pages/programs/mutations/UPDATE_PAGE_PROGRAM'
import { GET_PAGE_PROGRAM } from '@/graphql/setting/pages/programs/queries/GET_PAGE_PROGRAM'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    articleId: {
      type: [String, Number],
      required: true,
    },
  },
  setup(props, { emit }) {
    const { $toast, error } = useContext()

    const { form, validation } = useFormPagePrograms()

    const refetchQueries = [
      {
        query: GET_PAGE_PROGRAM,
        variables: {
          id: props.articleId,
        },
      },
    ]

    const { onResult: onResultPageProgram } = useQuery(GET_PAGE_PROGRAM, {
      id: props.articleId,
    })

    const {
      mutate: updatePageProgram,
      onDone: onUpdatePageProgramDone,
      onError: onUpdatePageProgramError,
      loading,
    } = useMutation(UPDATE_PAGE_PROGRAM, {
      refetchQueries,
    })

    onResultPageProgram(({ data }) => {
      if (!data.article) {
        return error({ statusCode: 404, message: 'Not Found' })
      }

      const { id, __typename, ...result } = data.article
      form.page = result
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      updatePageProgram({
        input: {
          id: props.articleId,
          update: form.page,
        },
      })
    }

    onUpdatePageProgramDone(({ data }) => {
      $toast.success(`Page ${props.title.toLowerCase()} successfully updated!`)
    })

    onUpdatePageProgramError((error) => {
      $toast.error(error.message)
    })

    return {
      validation,
      form,
      loading,
      onSave,
    }
  },
})
</script>
