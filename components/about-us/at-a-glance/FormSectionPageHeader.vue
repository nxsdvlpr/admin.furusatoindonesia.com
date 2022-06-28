<template>
  <NFormSection
    id="page-header"
    caption="Page Header"
    description="Basic page header information"
  >
    <div class="flex justify-end">
      <FormLangSelect v-model="form.displayLanguage" />
    </div>

    <NInputGroup :feedback="validation.error('page.title')" label="Title">
      <NInput
        v-model="form.page[form.displayLanguage === 'ID' ? 'title' : 'titleJa']"
        type="text"
      />
    </NInputGroup>

    <NInputGroup :feedback="validation.error('page.image')" label="Image">
      <UiImageUpload
        path="/about/at-a-glance/"
        :src="form.page.image"
        @image-changed="onImageChanged"
      />
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

import useFormAtGlanceSection from '@/components/about-us/at-a-glance/useFormAtGlanceSection'

import { UPDATE_PAGE_HOME } from '@/graphql/setting/pages/home/mutations/UPDATE_PAGE_HOME'
import { GET_PAGE_HOME } from '@/graphql/setting/pages/home/queries/GET_PAGE_HOME'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast, error } = useContext()

    const { form, validation } = useFormAtGlanceSection()

    const refetchQueries = [
      {
        query: GET_PAGE_HOME,
        variables: {
          id: 11,
        },
      },
    ]

    const { onResult: onResultArticle } = useQuery(GET_PAGE_HOME, {
      id: 11,
    })

    const {
      mutate: updateArticle,
      onDone: onUpdateArticleDone,
      onError: onUpdateArticleError,
      loading,
    } = useMutation(UPDATE_PAGE_HOME, {
      refetchQueries,
    })

    onResultArticle(({ data }) => {
      if (!data.article) {
        return error({ statusCode: 404, message: 'Not Found' })
      }

      const { id, __typename, ...result } = data.article
      form.page = result
    })

    const onImageChanged = (file) => {
      form.page.image = file.url
    }

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      updateArticle({
        input: {
          id: 11,
          update: form.page,
        },
      })
    }

    onUpdateArticleDone(({ data }) => {
      $toast.success('Page header successfully updated')
    })

    onUpdateArticleError((error) => {
      $toast.error(error.message)
    })

    return {
      validation,
      form,
      loading,
      onImageChanged,
      onSave,
    }
  },
})
</script>
