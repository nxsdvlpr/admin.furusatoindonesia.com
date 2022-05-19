<template>
  <div>
    <div v-if="data">
      <div class="font-medium">
        {{ data.name }}
      </div>
      <div class="flex items-center text-sm text-gray-600 gap-x-2">
        <NIcon icon="users" class="xs" />{{ data.type }}
      </div>
    </div>
    <div v-else>-</div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: undefined,
    },
  },
  setup(props) {},
}
</script>
