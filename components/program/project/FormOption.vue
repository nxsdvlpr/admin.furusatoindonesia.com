<template>
  <NForm>
    <NFormSection id="hero" caption="Hero" description="Basic hero information">
      <div class="flex justify-end">
        <FormLangSelect v-model="form.displayLanguage" />
      </div>

      <NInputGroup :feedback="validation.error('page.title')" label="Title">
        <NInput
          v-model="
            form.page[form.displayLanguage === 'ID' ? 'title' : 'titleJa']
          "
          type="text"
        />
      </NInputGroup>

      <NInputGroup :feedback="validation.error('page.body')" label="Body">
        <MarkdownEditor
          v-model="form.page[form.displayLanguage === 'ID' ? 'body' : 'bodyJa']"
          height="150px"
        />
      </NInputGroup>

      <NInputGroup :feedback="validation.error('page.image')" label="Image">
        <UiImageUpload
          path="/program/project/"
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
  </NForm>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useMutation, useQuery } from '@vue/apollo-composable'

import useFormProjectOption from '@/components/program/project/useFormProjectOption'

import { UPDATE_PAGE_HOME } from '@/graphql/setting/pages/home/mutations/UPDATE_PAGE_HOME'
import { GET_PAGE_HOME } from '@/graphql/setting/pages/home/queries/GET_PAGE_HOME'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast, error } = useContext()

    const { form, validation } = useFormProjectOption()

    const refetchQueries = [
      {
        query: GET_PAGE_HOME,
        variables: {
          id: 3,
        },
      },
    ]

    const { onResult: onResultHomeHero } = useQuery(GET_PAGE_HOME, {
      id: 3,
    })

    const {
      mutate: updateHomeHero,
      onDone: onUpdateHomeHeroDone,
      onError: onUpdateHomeHeroError,
      loading,
    } = useMutation(UPDATE_PAGE_HOME, {
      refetchQueries,
    })

    onResultHomeHero(({ data }) => {
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

      updateHomeHero({
        input: {
          id: 3,
          update: form.page,
        },
      })
    }

    const onImageChanged = (file) => {
      form.page.image = file.url
    }

    onUpdateHomeHeroDone(({ data }) => {
      $toast.success('Section hero successfully updated')
    })

    onUpdateHomeHeroError((error) => {
      $toast.error(error.message)
    })

    return {
      validation,
      form,
      loading,
      onSave,
      onImageChanged,
    }
  },
})
</script>
