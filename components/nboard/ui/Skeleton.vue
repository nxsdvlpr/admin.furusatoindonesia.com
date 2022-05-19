<template>
  <div
    class="n-skeleton inline-flex items-center"
    :style="{ width: width, height: height }"
  >
    <vue-skeleton-loader
      :type="type"
      :width="skeletonWidth"
      :height="skeletonHeight"
      :animation="animation"
      :rounded="rounded"
      :radius="radius"
    />
  </div>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import VueSkeletonLoader from 'skeleton-loader-vue'

export default defineComponent({
  components: {
    VueSkeletonLoader,
  },
  props: {
    type: {
      type: String,
      default: 'rect',
    },
    size: {
      type: String,
      default: 'md',
    },
    width: {
      type: String,
      default: '100%',
    },
    animation: {
      type: String,
      default: 'fade',
    },
    rounded: {
      type: Boolean,
      default: true,
    },
    radius: {
      type: [String, Number],
      default: 5,
    },
  },
  setup(props, { emit }) {
    const sizes = {
      xxs: {
        rect: {
          height: '15.12px',
          skeletonHeight: '0.6rem',
        },
        circle: {
          diameter: '28px',
        },
      },
      xs: {
        rect: {
          height: '16.23px',
          skeletonHeight: '0.7rem',
        },
        circle: {
          diameter: '28px',
        },
      },
      sm: {
        rect: {
          height: '19.1px',
          skeletonHeight: '0.79rem',
        },
        circle: {
          diameter: '35px',
        },
      },
      md: {
        rect: {
          height: '21px',
          skeletonHeight: '0.83rem',
        },
        circle: {
          diameter: '42px',
        },
      },
      lg: {
        rect: {
          height: '22.4px',
          skeletonHeight: '0.85rem',
        },
        circle: {
          diameter: '49px',
        },
      },
      xl: {
        rect: {
          height: '24.5px',
          skeletonHeight: '1rem',
        },
        circle: {
          diameter: '56px',
        },
      },
      xxl: {
        rect: {
          height: '33px',
          skeletonHeight: '2.25rem',
        },
        circle: {
          diameter: '72px',
        },
      },
    }

    const height = computed(() => {
      if (props.type === 'circle') {
        return sizes[props.size].circle.diameter
      }
      return sizes[props.size][props.type].height
    })

    const skeletonWidth = computed(() => {
      if (props.type === 'circle') {
        if (props.width === '100%') {
          return sizes[props.size].circle.diameter
        }
        return props.width
      }
      return props.width
    })

    const skeletonHeight = computed(() => {
      if (props.type === 'circle') {
        if (props.width === '100%') {
          return sizes[props.size].circle.diameter
        }
        return props.width
      }
      return sizes[props.size][props.type].skeletonHeight
    })

    return {
      height,
      skeletonWidth,
      skeletonHeight,
    }
  },
})
</script>

<style lang="postcss" scoped>
/* Temporary set inline-block to measure the height of the skeleton */

/deep/ .loader {
  cursor: default;
}
</style>
