<template>
  <div>
    <NRichSelect
      placeholder="Choose Partner"
      :value="value"
      :disabled="disabled"
      :get-option-label="(option) => `${option.name} (${option.type})`"
      :get-option-key="(option) => option.id"
      :options="options"
      :filterable="false"
      :clearable="clearable"
      @option:selected="onSelected"
      @search="onSearch"
      @input="onInput"
    />
  </div>
</template>

<script>
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'
import { debounce } from 'lodash'
import { GET_PARTNERS } from '@/graphql/partner/queries/GET_PARTNERS'

export default defineComponent({
  props: {
    value: {
      type: [Object],
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const variables = reactive({
      paging: {
        first: 25,
      },
      query: '%%',
      sorting: {
        field: 'name',
        direction: 'ASC',
      },
    })

    const { result } = useQuery(GET_PARTNERS, variables, {
      fetchPolicy: 'cache-and-network',
    })

    const options = useResult(result, [], (data) => {
      const partners = []
      for (let i = 0; i < data.partners.edges.length; i++) {
        const element = data.partners.edges[i]
        partners.push(element.node)
      }
      return partners
    })

    const onInput = (value) => {
      emit('input', value)
    }

    const onSelected = (value) => {
      emit('selected', value)
    }

    const onSearch = debounce((query, loading) => {
      variables.query = `%${query}%`
    }, 250)

    return {
      options,
      onInput,
      onSelected,
      onSearch,
    }
  },
})
</script>
