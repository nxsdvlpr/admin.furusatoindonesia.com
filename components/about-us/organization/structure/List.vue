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
        <div class="flex">
          <NIconButton
            class="secondary"
            icon="users"
            @click="onMembersClick(props.row)"
          />
          <NIconButton
            v-if="props.index > 0"
            class="primary"
            icon="arrow-up-2"
            @click="changeSequenceUp(props.row)"
          />
          <NIconButton
            v-if="rows.length > 1 && props.index < rows.length - 1"
            class="primary"
            icon="arrow-down-2"
            @click="changeSequenceDown(props.row)"
          />
        </div>
      </div>
      <NTableCellResponsive v-else :props="props"></NTableCellResponsive>
    </template>
  </NTable>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable'
import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import { GET_ORGANIZATION_STRUCTURES } from '@/graphql/about-us/organization/structure/queries/GET_ORGANIZATION_STRUCTURES'
import { DESTROY_ORGANIZATION_STRUCTURES } from '@/graphql/about-us/organization/structure/mutations/DESTROY_ORGANIZATION_STRUCTURES'
import { CHANGE_ORGANIZATION_STRUCTURE_SEQUENCE } from '@/graphql/about-us/organization/structure/mutations/CHANGE_ORGANIZATION_STRUCTURE_SEQUENCE'

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

    const { mutate: changeSequence, onDone: onChangeSequenceDone } =
      useMutation(CHANGE_ORGANIZATION_STRUCTURE_SEQUENCE, {})

    const { refetch, rows, totalRecords, pageInfo, loading, methods } =
      useNTableCursorRemoteData({
        getQuery: GET_ORGANIZATION_STRUCTURES,
        destroyQuery: DESTROY_ORGANIZATION_STRUCTURES,
        dataProperty: 'organizationStructures',
        customVariables: {
          sorting: {
            field: 'sequence',
            direction: 'ASC',
          },
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

    const onMembersClick = (row) => {
      emit('members-click', row)
    }

    const changeSequenceDown = (row) => {
      changeSequence({
        id: row.id,
        direction: 'down',
      })
    }

    const changeSequenceUp = (row) => {
      changeSequence({
        id: row.id,
        direction: 'up',
      })
    }

    onChangeSequenceDone(() => {
      refetch()
    })

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
      onMembersClick,
      changeSequenceDown,
      changeSequenceUp,
    }
  },
})
</script>
