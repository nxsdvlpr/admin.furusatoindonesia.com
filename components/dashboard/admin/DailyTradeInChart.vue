<template>
  <NChartLine
    v-if="chartData.labels"
    :style="{
      position: 'relative',
      height: '100%',
      width: '99%',
      margin: 'auto',
    }"
    :chart-data="chartData"
    :options="chartOptions"
  />
</template>

<script>
import { defineComponent, reactive, useContext } from '@nuxtjs/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'
import { DAILY_TRADEIN_SUMMARY } from '@/graphql/dashboard/queries/DAILY_TRADEIN_SUMMARY'

export default defineComponent({
  setup() {
    const { $__ } = useContext()

    const { result } = useQuery(DAILY_TRADEIN_SUMMARY, {
      fetchPolicy: 'network-only',
    })

    const chartOptions = reactive({
      scales: {
        yAxes: [
          {
            ticks: {
              callback(label, index, labels) {
                const newLabel = parseInt(label)

                if (!newLabel) {
                  return label
                }
                return $__.prettyNumber(newLabel, 1)
              },
              stepSize: 10,
              beginAtZero: false,
            },
          },
        ],
      },
      tooltips: {
        callbacks: {
          label(tooltipItem, data) {
            let label = data.datasets[tooltipItem.datasetIndex].label || ''

            if (label) {
              label += ': '
            }

            const newValue = parseInt(tooltipItem.yLabel)

            label += newValue.toLocaleString('id-ID', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })

            return label
          },
        },
      },
    })

    const chartData = useResult(result, {}, (data) => {
      const dailyTradeinSummary = data.dailyTradeinSummary
      const labels = dailyTradeinSummary.map(({ date }) =>
        $__.formatDate(date, 'EEEE')
      )
      const dataSheet = dailyTradeinSummary.map(({ count }) => count)

      return {
        labels,
        datasets: [
          {
            label: 'Daily Trade-In',
            fill: false,
            borderColor: '#6391ff',
            pointBackgroundColor: '#6391ff',
            gradientBackground: true,
            pointBorderWidth: 1,
            borderWidth: 2,
            data: dataSheet,
          },
        ],
      }
    })

    return {
      chartOptions,
      chartData,
    }
  },
})
</script>
