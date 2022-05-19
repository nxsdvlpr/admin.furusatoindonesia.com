<template>
  <NTable
    mode="remote"
    :total-rows="totalRecords"
    :is-loading.sync="loading"
    :rows="rows"
    :columns="columns"
    :create-options="{ label: 'Add Partner' }"
    :pagination-options="{
      enabled: true,
      perPage: 20,
    }"
    :page-info="pageInfo"
    @on-page-change="methods.onPageChange"
    @on-per-page-change="methods.onPerPageChange"
    @on-sort-change="methods.onSortChange"
    @on-search="methods.onSearch"
    @on-row-tap="onRowTap"
    @on-create="onCreate"
    @on-delete="onDelete"
  >
    <template #table-row="props">
      <div v-if="props.column.field === 'name'">
        <div class="font-medium">{{ props.row.name }}</div>
        <div class="font-sm text-green-500">
          {{ props.row.email.toLowerCase() }}
        </div>
      </div>
      <NTableCellResponsive
        v-else-if="props.column.field === 'type'"
        :props="props"
      >
        <NOptionBadge
          :value="props.row.type"
          :options="typeOptions"
        ></NOptionBadge>
      </NTableCellResponsive>
      <NTableCellResponsive v-else :props="props"></NTableCellResponsive>
    </template>
  </NTable>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import { GET_PARTNERS } from '@/graphql/partner/queries/GET_PARTNERS'
import { DESTROY_PARTNERS } from '@/graphql/partner/mutations/DESTROY_PARTNERS'

export default defineComponent({
  setup(props, { emit }) {
    const typeOptions = ref([
      { value: 'ACSC', label: 'ACSC', class: 'secondary' },
      { value: 'COURIER', label: 'Courier', class: 'primary' },
      { value: 'STORE', label: 'Store', class: 'outline' },
    ])

    const columns = ref([
      {
        label: 'Name',
        field: 'name',
        width: '300px',
      },
      {
        label: 'Address',
        field: 'address',
      },
      {
        label: 'Phone',
        field: 'phone',
        width: '120px',
      },
      {
        label: 'Type',
        field: 'type',
        align: 'center',
      },
    ])

    const { rows, totalRecords, pageInfo, loading, methods } =
      useNTableCursorRemoteData({
        getQuery: GET_PARTNERS,
        destroyQuery: DESTROY_PARTNERS,
        dataProperty: 'partners',
      })

    const onCreate = () => {
      emit('create')
    }

    const onRowTap = (params) => {
      emit('row-tap', params.row)
    }

    const onDelete = (rows) => {
      methods.destroyItems(rows, () => {
        // todo after destroy success
      })

      emit('delete', rows)
    }

    return {
      columns,
      rows,
      totalRecords,
      pageInfo,
      loading,
      methods,
      typeOptions,
      onCreate,
      onRowTap,
      onDelete,
    }
  },
})
</script>
