<!-- .vuepress/theme/layouts/GlobalLayout.vue -->
<template>
  <div id="global-layout">
    <!-- <header><h1>GlobalLayout.Header</h1></header> -->
    <component :is="layout"/>
    <!-- <footer><h1>GlobalLayout.Footer</h1></footer> -->
  </div>
</template>

<script>
import Vue from 'vue'
import { setGlobalInfo } from '@app/util'
export default {
  name: 'GlobalLayout',
  computed: {
    layout () {
      const layout = this.getLayout()
      setGlobalInfo('layout', layout)
      return Vue.component(layout)
    }
  },
  methods: {
    getLayout () {
      if (this.$page.path) {
        const layout = this.$page.frontmatter.layout
        if (layout && (this.$vuepress.getLayoutAsyncComponent(layout)
          || this.$vuepress.getVueComponent(layout))) {
          return layout
        }
        return 'Layout'
      }
      return 'NotFound'
    }
  }
}
</script>