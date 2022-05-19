<script>
import {
  defineComponent,
  useStore,
  computed,
  watch,
} from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    vars: undefined,
  },

  setup(props) {
    const store = useStore()

    const debuggerCode = computed(() => props.vars)

    const watchDebug = (payload) => {
      if (payload !== '' && payload !== null) {
        store.commit('nboard/debugCode', payload)
      } else {
        store.commit('nboard/resetDebugCode')
      }
    }

    watch(debuggerCode, watchDebug, { immediate: true, deep: true })
  },
})
</script>
