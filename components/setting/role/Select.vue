<template>
  <div>
    <NRichSelect
      placeholder="Choose Role"
      :value="value"
      :disabled="disabled"
      :get-option-label="(option) => option.name"
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
import { GET_ROLES } from '@/graphql/setting/role/queries/GET_ROLES'

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
      sorting: {
        field: 'id',
        direction: 'ASC',
      },
    })

    const { result } = useQuery(GET_ROLES, variables, {
      fetchPolicy: 'cache-and-network',
    })

    const options = useResult(result, [], (data) => {
      const roles = []
      for (let i = 0; i < data.roles.edges.length; i++) {
        const element = data.roles.edges[i]
        roles.push(element.node)
      }
      return roles
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
