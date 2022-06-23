<template>
  <div>
    <div class="space-y-6">
      <div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCounterTotalUnreadMessage />
          <DashboardCounterTotalPublishedBlog />
          <DashboardCounterTotalPublishedResource />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardWidgetRecentResource />
        <DashboardWidgetRecentBlog />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {},
})
</script>
