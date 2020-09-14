<template>
  <ul
    v-if="items && items.length"
    class="sidebar-links"
  >
    <li
      v-for="(item, i) in items"
      :key="i"
    >
      <SidebarGroup
        v-if="item.type === 'group'"
        :item="item"
        :open="i === openGroupIndex"
        :collapsable="item.collapsable || item.collapsible"
        :depth="depth"
        @toggle="toggleGroup(i)"
      />
      <SidebarLink
        v-else
        :sidebar-depth="sidebarDepth"
        :item="item"
      />
    </li>
  </ul>
</template>

<script>
import SidebarGroup from '@theme/components/SidebarGroup.vue'
import SidebarLink from '@theme/components/SidebarLink.vue'
import { isActive } from '../util'

export default {
  name: 'SidebarLinks',

  components: { SidebarGroup, SidebarLink },

  props: [
    'items',
    'depth',  // depth of current sidebar links
    'sidebarDepth', // depth of headers to be extracted
    'initialOpenGroupIndex'
  ],

  data () {
    return {
      openGroupIndex: this.initialOpenGroupIndex || 0
    }
  },

  watch: {
    '$route' () {
      this.refreshIndex()
    }
  },

  created () {
    this.refreshIndex()
  },

  methods: {
    refreshIndex () {
      const index = resolveOpenGroupIndex(
        this.$route,
        this.items
      )
      if (index > -1) {
        this.openGroupIndex = index
      }
    },

    toggleGroup (index) {
      this.openGroupIndex = index === this.openGroupIndex ? -1 : index
    },

    isActive (page) {
      return isActive(this.$route, page.regularPath)
    }
  }
}

function resolveOpenGroupIndex (route, items) {
  // console.log('resolveOpenGroupIndex', route, items);
  if (!items || !items.length) return -1;
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    // console.log('resolveOpenGroupIndex....descendantIsActive', item);
    if (descendantIsActive(route, item)) {
      return i
    }
  }
  return -1
}

function descendantIsActive (route, item) {
  // console.log('descendantIsActive', item);
  if (item && item.type === 'group') {
    return item.children.some(child => {
      if (child.type === 'group') {
        return descendantIsActive(route, child)
      } else {
        return child.type === 'page' && isActive(route, child.path)
      }
    })
  }
  return false
}
</script>
