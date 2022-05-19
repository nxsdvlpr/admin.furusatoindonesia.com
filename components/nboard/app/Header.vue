<template>
  <div
    v-if="true"
    id="nAppHeader"
    ref="nAppHeader"
    class="sticky z-10 top-16 n-app-header"
    :class="{ 'is-scroll': isScroll }"
  >
    <div class="border-b bg-app-lightest n-app-header-content">
      <div class="container">
        <div
          class="flex items-center justify-between gap-x-4 n-app-header-content-wrapper"
          :class="{
            'pb-8 md:pb-12': !hasAfterSlot && !isScroll,
            'pb-3 md:pb-4': !hasAfterSlot && isScroll,
            'pb-0': hasAfterSlot,
          }"
        >
          <div
            class="flex-grow-0 md:flex-grow text-gray-darkest n-app-header-title overflow-hidden"
          >
            <slot></slot>
          </div>
          <div v-if="hasMoreSlot" class="flex-shrink-0 n-app-header-more">
            <portal-target name="n-app-header-more">
              <slot name="more"> </slot>
            </portal-target>
          </div>
        </div>
        <div
          v-if="hasAfterSlot"
          class="n-app-header-after"
          :class="{ 'mt-4 md:mt-6': !isScroll, 'mt-1': isScroll }"
        >
          <div id="nAppHeaderAfterWrapper">
            <slot name="after"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="n-app-header-overlay"></div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
export default {
  computed: {
    isScroll() {
      return this.$store.getters['nboard/appHeader'].isSmall
    },
    hasMoreSlot() {
      return !!this.$slots.more
    },
    hasAfterSlot() {
      return !!this.$slots.after
    },
  },
  mounted() {
    this.$nextTick(() => {
      // @todo: using resizeElementFullWidth for dynamic tabs component
      // temporary disable due to bug showing horizontal
      // this.$__.resizeElementFullWidth('nAppHeaderAfterWrapper')
      // window.addEventListener('resize', () => {
      //   this.$__.resizeElementFullWidth('nAppHeaderAfterWrapper')
      // })
    })
    const store = this.$store
    window.addEventListener('scroll', function () {
      debounce(() => {
        if (window.pageYOffset > 120) {
          store.commit('nboard/setAppHeaderSmall', true)
        } else {
          store.commit('nboard/setAppHeaderSmall', false)
        }
      }, 200)()
    })
  },
}
</script>

<style lang="postcss" scoped>
.n-app-header {
  &-content {
    /* Header inner bottom shadow */
    --tw-shadow: inset 0 -3px 6px 0 rgba(0, 0, 0, 0.04);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

    &-wrapper {
      @apply pt-5;
      transition: height 0.5s;
      /* @todo: fix height calculation for transition */
      /* height: 66px; */

      @screen md {
        @apply pt-8;
        /* @todo: fix height calculation for transition */
        /* height: 94px; */
      }

      .n-app-header-title {
        transition: height 1s;
        h1 {
          @apply line-clamp-1;
          @apply leading-none;
          font-size: 1.2rem;
          line-height: 1.24rem;
          letter-spacing: -0.025em;

          @screen md {
            font-size: 2.3rem;
            line-height: 2.36rem;
          }

          & ~ * {
            @apply text-xs;
            @apply text-gray-600;

            @screen md {
              @apply text-sm;
            }
          }
        }
      }
    }
  }

  &-overlay {
    @apply h-8 md:h-14;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 1) 6%,
      rgba(255, 255, 255, 0) 100%
    );
  }
}

.is-scroll {
  .n-app-header {
    &-content {
      &-wrapper {
        @apply pt-3;
        @apply flex-row;
        @apply justify-between;
        @apply items-center;
        /* @todo: fix height calculation for transition */
        /* height: 44px; */

        @screen md {
          @apply pt-4;
          /* @todo: fix height calculation for transition */
          /* height: 50px; */
        }

        .n-app-header-title {
          h1 {
            @apply mb-0;
            font-size: 1.05rem;

            @screen md {
              @apply font-medium;
              font-size: 1.28rem;
            }

            & + * {
              @apply hidden;

              @screen md {
                @apply block;
                @apply text-xs;
                @apply text-gray-base;
              }
            }
          }
        }
      }
    }

    &-more {
      @apply mt-0;
    }
  }
}
</style>
