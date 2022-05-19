<template>
  <div :key="key" class="flex flex-col n-tabs">
    <div class="overflow-hidden w-full">
      <ul class="flex gap-x-6 h-1 md:gap-x-10 n-tabs-items-placeholder">
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          class="n-tabs-item-placeholder invisible h-1"
        >
          <nuxt-link
            class="inline-block text-xs md:text-sm text-gray-500 border-b-2 border-transparent hover:border-primary-dark active:border-primary whitespace-nowrap link"
            :to="tab.to"
          >
            {{ tab.name }}
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="flex items-center">
      <div>
        <ul class="flex gap-x-6 md:gap-x-10 n-tabs-items">
          <li
            v-for="(tab, index) in visibleTabs"
            :key="index"
            class="n-tabs-item"
          >
            <nuxt-link
              class="inline-block py-3 md:py-4 text-xs md:text-sm text-gray-500 border-b-2 border-transparent hover:border-primary-dark active:border-primary whitespace-nowrap link"
              :to="tab.to"
            >
              {{ tab.name }}
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div v-if="dropdownTabs.length > 0">
        <div class="ml-4">
          <NDropdown
            ref="tabsDropdown"
            class="bottom-right"
            :fixed-classes="fixedClasses"
          >
            <template #button>
              <div>
                <NIcon icon="more" class="mt-0.5" />
              </div>
            </template>
            <div slot-scope="{ hide }" class="n-tabs-items">
              <div
                v-for="(tab, index) in dropdownTabs"
                :key="index"
                class="n-tabs-item"
                role="menuitem"
                @click="hide"
              >
                <nuxt-link :to="tab.to" class="dropdown-item">
                  {{ tab.name }}
                </nuxt-link>
              </div>
            </div>
          </NDropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { slice } from 'lodash'

export default {
  props: {
    tabs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      key: this.$__.randomInt(8),
      fixedClasses: {
        button:
          'px-1 py-0 leading-none shadow-sm rounded leading-0 bg-white hover:bg-app-lightest focus:bg-app-lightest',
      },
      visibleTabs: this.tabs,
      dropdownTabs: [],
      initTabs: this.tabs,
    }
  },
  mounted() {
    // this.resetInitTabs()
    this.populateTabs()
    window.addEventListener('resize', () => {
      this.populateTabs()
    })

    setTimeout(this.populateTabs(), 1000)
  },
  methods: {
    // resetInitTabs() {
    //   // this.visibleTabs = this.initTabs
    //   // this.dropdownTabs = []
    //   const tabItems = document.querySelectorAll('.n-tabs-item-placeholder')

    //   console.log(tabItems, this.initTabs)

    //   console.log(tabItems)
    //   this.initTabs.map((tab, index) => {
    //     if (!tabItems[index]) {
    //       tab.rect = { right: 0 }
    //       return tab
    //     }

    //     tab.rect = tabItems[index].getBoundingClientRect()
    //     return tab
    //   })
    // },
    populateTabs() {
      // Get window/viewport width

      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      )

      const tabItems = Array.from(
        document.querySelectorAll('.n-tabs-item-placeholder')
      )

      this.visibleTabs = this.initTabs.filter(
        (tab, index) => tabItems[index].getBoundingClientRect().right < vw - 80
      )
      this.dropdownTabs = slice(this.initTabs, this.visibleTabs.length)
    },
  },
}
</script>

<style lang="postcss" scoped>
.n-tabs {
  &-item .nuxt-link-exact-active {
    @apply border-primary;
    @apply text-gray-dark;
  }
}
</style>
