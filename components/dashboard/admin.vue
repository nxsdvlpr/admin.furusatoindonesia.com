<template>
  <div>
    <div class="space-y-6">
      <div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- <NCounterWidget :options="totalSummaryWidgetOption" />
          <NCounterWidget :options="todayRegistrationWidgetOption" />
          <NCounterWidget :options="todayVerificationWidgetOption" /> -->
        </div>
      </div>

      <div>
        <!-- <NWidget title="Daily Trade-Ins">
          <DashboardAdminDailyTradeInChart />
        </NWidget> -->
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'
import { TRADEIN_SUMMARY } from '@/graphql/dashboard/queries/TRADEIN_SUMMARY'

export default defineComponent({
  setup() {
    const { result } = useQuery(TRADEIN_SUMMARY, {
      fetchPolicy: 'network-only',
    })

    const tradeinSummary = useResult(result, {}, (data) => data.tradeinSummary)

    const totalSummaryWidgetOption = computed(() => ({
      title: 'Total Trade-In',
      counter: tradeinSummary.value.total,
      counterChange: false,
    }))

    const todayRegistrationWidgetOption = computed(() => ({
      title: 'Today Registration',
      counter: tradeinSummary.value.todayRegistrationCount,
      counterChange: false,
    }))

    const todayVerificationWidgetOption = computed(() => ({
      title: 'Today Verification',
      counter: tradeinSummary.value.todayVerificationCount,
      counterChange: false,
    }))

    return {
      totalSummaryWidgetOption,
      todayRegistrationWidgetOption,
      todayVerificationWidgetOption,
    }
  },
})
</script>
