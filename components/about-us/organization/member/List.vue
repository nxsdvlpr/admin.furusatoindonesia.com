<template>
  <NTable
    mode="remote"
    :total-rows="totalRecords"
    :is-loading.sync="loading"
    :rows="rows"
    :columns="columns"
    :create-options="{ label: 'Add Member' }"
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
      <div v-if="props.column.field === 'fullname'">
        <div class="font-medium">{{ props.row.fullname }}</div>
      </div>
      <NTableCellResponsive v-else :props="props"></NTableCellResponsive>
    </template>
  </NTable>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import { GET_ORGANIZATION_MEMBERS } from '@/graphql/about-us/organization/member/queries/GET_ORGANIZATION_MEMBERS'
import { DESTROY_ORGANIZATION_MEMBERS } from '@/graphql/about-us/organization/member/mutations/DESTROY_ORGANIZATION_MEMBERS'

export default defineComponent({
  props: {
    organizationId: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const columns = ref([
      {
        label: 'Fullname',
        field: 'fullname',
      },
      {
        label: 'Profession',
        field: 'profession',
      },
    ])

    const { rows, totalRecords, pageInfo, loading, methods } =
      useNTableCursorRemoteData({
        getQuery: GET_ORGANIZATION_MEMBERS,
        destroyQuery: DESTROY_ORGANIZATION_MEMBERS,
        dataProperty: 'organizationMembers',
        customVariables: {
          organizationId: props.organizationId,
        },
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
      onCreate,
      onRowTap,
      onDelete,
    }
  },
})
</script>
