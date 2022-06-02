<template>
  <NTable
    mode="remote"
    :total-rows="totalRecords"
    :is-loading.sync="loading"
    :rows="rows"
    :columns="columns"
    :create-options="{ label: 'Add Organization Structure' }"
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
      <div v-if="props.column.field === 'subject'">
        <div class="font-medium">{{ props.row.subject }}</div>
      </div>
      <div
        v-else-if="props.column.field === 'action'"
        class="n-table-action-group"
        @click.stop
      >
        <NIconButton
          class="secondary"
          icon="users"
          @click="onPeoplesClick(props.row)"
        />
      </div>
      <NTableCellResponsive v-else :props="props"></NTableCellResponsive>
    </template>
  </NTable>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import { GET_ORGANIZATION_STRUCTURES } from '@/graphql/about-us/organization/structure/queries/GET_ORGANIZATION_STRUCTURES'
import { DESTROY_ORGANIZATION_STRUCTURES } from '@/graphql/about-us/organization/structure/mutations/DESTROY_ORGANIZATION_STRUCTURES'

export default defineComponent({
  setup(props, { emit }) {
    const columns = ref([
      {
        label: 'Subject',
        field: 'subject',
      },
      {
        label: 'Description',
        field: 'description',
      },
      {
        label: ' ',
        field: 'action',
        type: 'action',
        align: 'right',
        width: '60px',
      },
    ])

    const { rows, totalRecords, pageInfo, loading, methods } =
      useNTableCursorRemoteData({
        getQuery: GET_ORGANIZATION_STRUCTURES,
        destroyQuery: DESTROY_ORGANIZATION_STRUCTURES,
        dataProperty: 'organizationStructures',
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

    const onPeoplesClick = (row) => {
      emit('peoples-click', row)
    }

    return {
      columns,
      rows,
      totalRecords,
      pageInfo,
      loading,
      methods,
      onCreate,
      onRowTap,
      onDelete,
      onPeoplesClick,
    }
  },
})
</script>
